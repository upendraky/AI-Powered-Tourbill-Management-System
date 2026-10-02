"use client";

import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  Bell,
  Building2,
  CalendarDays,
  Camera,
  CheckCircle2,
  ChevronDown,
  Clock,
  Download,
  Eye,
  FileText,
  Filter,
  History,
  IndianRupee,
  LayoutDashboard,
  LockKeyhole,
  LogOut,
  MapPin,
  Menu,
  MoreVertical,
  Moon,
  Plane,
  Plus,
  Receipt,
  Search,
  ShieldCheck,
  Sun,
  UploadCloud,
  User,
  Wallet,
  X,
  XCircle
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ClaimDonut, MiniChart } from "@/components/charts";
import {
  activities,
  claims,
  employee,
  expenses,
  miniSeries,
  timeline,
  type Status
} from "@/data/mock-data";
import { cn, downloadTextFile, formatCurrency } from "@/lib/utils";

type Page = "Dashboard" | "Expenses" | "My Claims" | "Track Status" | "History" | "Profile";

const navItems = [
  { label: "Dashboard" as const, icon: LayoutDashboard },
  { label: "Expenses" as const, icon: Receipt },
  { label: "My Claims" as const, icon: FileText },
  { label: "Track Status" as const, icon: MapPin },
  { label: "History" as const, icon: History },
  { label: "Profile" as const, icon: User }
];

const statusStyles: Record<Status, string> = {
  Approved: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/14 dark:text-emerald-300",
  "In Review": "bg-orange-100 text-orange-700 dark:bg-orange-500/14 dark:text-orange-300",
  Rejected: "bg-red-100 text-red-700 dark:bg-red-500/14 dark:text-red-300",
  Draft: "bg-slate-100 text-slate-600 dark:bg-slate-500/18 dark:text-slate-300",
  Pending: "bg-amber-100 text-amber-700 dark:bg-amber-500/14 dark:text-amber-300"
};

const pageDescriptions: Record<Page, string> = {
  Dashboard: "Travel, claims, and reimbursements at a glance",
  Expenses: "Submit and manage your expenses",
  "My Claims": "View and manage your submitted claims",
  "Track Status": "Track your claim status in real time",
  History: "View past claims and expenses",
  Profile: "Manage your personal information"
};

const expenseSchema = z.object({
  category: z.string().min(2, "Choose a category"),
  description: z.string().min(3, "Add a short description"),
  amount: z.coerce.number().min(1, "Amount is required")
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(6, "Current password is required"),
    newPassword: z.string().min(8, "Use at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm the password")
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  });

type ExpenseForm = z.infer<typeof expenseSchema>;
type PasswordForm = z.infer<typeof passwordSchema>;

export function DashboardApp() {
  const [activePage, setActivePage] = useState<Page>("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2600);
  };

  const setPage = (page: Page) => {
    setActivePage(page);
    setSidebarOpen(false);
    setLoading(true);
    window.setTimeout(() => setLoading(false), 350);
  };

  return (
    <div className={cn(darkMode && "dark")}>
      <div className="min-h-screen bg-mist bg-steel-grid bg-[size:32px_32px] text-slate-950 dark:bg-slate-950 dark:text-white">
        <Sidebar activePage={activePage} open={sidebarOpen} setPage={setPage} onClose={() => setSidebarOpen(false)} />
        <main className="min-h-screen lg:pl-72">
          <Topbar
            activePage={activePage}
            darkMode={darkMode}
            globalSearch={globalSearch}
            onMenu={() => setSidebarOpen(true)}
            onSearch={setGlobalSearch}
            onToggleDark={() => setDarkMode((value) => !value)}
            onNotify={() => notify("You have 3 pending expense alerts.")}
          />
          <Hero activePage={activePage} />
          <div className="mx-auto max-w-[1540px] px-4 pb-8 sm:px-6 lg:px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePage}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                {loading ? (
                  <SkeletonScreen />
                ) : (
                  <PageContent
                    activePage={activePage}
                    globalSearch={globalSearch}
                    notify={notify}
                    openExpenseModal={() => setModalOpen(true)}
                  />
                )}
              </motion.div>
            </AnimatePresence>
            <Footer />
          </div>
        </main>
        <AddExpenseModal open={modalOpen} onClose={() => setModalOpen(false)} notify={notify} />
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 18 }}
              className="fixed bottom-5 right-5 z-50 rounded-2xl border border-white/70 bg-white/95 px-5 py-3 text-sm font-semibold text-navy shadow-glass dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            >
              {toast}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Sidebar({
  activePage,
  open,
  setPage,
  onClose
}: {
  activePage: Page;
  open: boolean;
  setPage: (page: Page) => void;
  onClose: () => void;
}) {
  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.button
            aria-label="Close sidebar"
            className="fixed inset-0 z-30 bg-slate-950/50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-72 -translate-x-full flex-col overflow-hidden bg-navy text-white shadow-2xl transition-transform duration-300 lg:translate-x-0",
          open && "translate-x-0"
        )}
      >
        <div className="absolute inset-0 bg-[url('/assets/molten-sidebar.png')] bg-cover bg-center opacity-56" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/92 to-navy/80" />
        <div className="relative flex h-full flex-col p-5">
          <div className="mb-8 flex items-center gap-3">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white">
              <div className="h-8 w-8 rotate-45 rounded-[7px] bg-navy">
                <div className="m-auto mt-2 h-4 w-4 rounded-[4px] bg-white" />
              </div>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-white/70">सेल</div>
              <div className="text-2xl font-black leading-none">SAIL BSP</div>
              <div className="mt-2 text-xs text-white/72">Bhilai Steel Plant</div>
            </div>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activePage === item.label;
              return (
                <motion.button
                  key={item.label}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPage(item.label)}
                  className={cn(
                    "relative flex h-12 w-full items-center gap-3 rounded-2xl px-4 text-left text-sm font-semibold text-white/80 transition",
                    active && "text-white shadow-glow"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="active-nav"
                      className="absolute inset-0 rounded-2xl border border-orange-300/60 bg-orange-500/18"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <Icon className="relative h-5 w-5" />
                  <span className="relative">{item.label}</span>
                </motion.button>
              );
            })}
            <button className="flex h-12 w-full items-center gap-3 rounded-2xl px-4 text-left text-sm font-semibold text-white/80 transition hover:bg-white/10">
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </nav>

          <div className="relative mt-auto pt-8">
            <div className="rounded-3xl border border-white/10 bg-white/8 p-4 shadow-glow">
              <p className="text-2xl font-black leading-tight">हम बनाते हैं<br />मजबूत भारत</p>
              <div className="mt-3 h-1 w-16 rounded-full bg-saffron" />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

function Topbar({
  activePage,
  darkMode,
  globalSearch,
  onMenu,
  onSearch,
  onToggleDark,
  onNotify
}: {
  activePage: Page;
  darkMode: boolean;
  globalSearch: string;
  onMenu: () => void;
  onSearch: (value: string) => void;
  onToggleDark: () => void;
  onNotify: () => void;
}) {
  return (
    <div className="sticky top-0 z-20 border-b border-white/70 bg-white/78 px-4 py-3 backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-950/78 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1540px] items-center gap-3">
        <button className="grid h-10 w-10 place-items-center rounded-2xl bg-navy text-white lg:hidden" onClick={onMenu} aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </button>
        <div className="hidden text-sm font-semibold text-slate-500 dark:text-slate-400 sm:block">
          Home / <span className="text-navy dark:text-white">{activePage}</span>
        </div>
        <div className="ml-auto flex flex-1 items-center justify-end gap-2">
          <label className="relative hidden w-full max-w-md md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={globalSearch}
              onChange={(event) => onSearch(event.target.value)}
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-royal focus:ring-4 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:focus:ring-blue-950"
              placeholder="Global search claims, expenses..."
            />
          </label>
          <IconButton label="Notifications" onClick={onNotify}>
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-danger ring-2 ring-white dark:ring-slate-900" />
          </IconButton>
          <IconButton label="Toggle theme" onClick={onToggleDark}>
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </IconButton>
          <button className="hidden h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 text-sm font-semibold text-navy shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white sm:flex">
            <span className="grid h-7 w-7 place-items-center rounded-xl bg-royal text-xs font-black text-white">ST</span>
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function IconButton({ label, onClick, children }: { label: string; onClick?: () => void; children: React.ReactNode }) {
  return (
    <button
      aria-label={label}
      title={label}
      onClick={onClick}
      className="relative grid h-11 w-11 place-items-center rounded-2xl border border-slate-200 bg-white text-navy shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:text-white"
    >
      {children}
    </button>
  );
}

function Hero({ activePage }: { activePage: Page }) {
  return (
    <section className="relative mb-6 h-[250px] overflow-hidden">
      <div className="absolute inset-0 bg-[url('/assets/steel-plant-hero.png')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/84 to-white/20 dark:from-slate-950 dark:via-slate-950/78 dark:to-slate-950/15" />
      <div className="relative mx-auto flex h-full max-w-[1540px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl pt-4">
          <p className="text-xl font-semibold text-navy dark:text-blue-100">Welcome back,</p>
          <h1 className="mt-2 text-4xl font-black text-navy dark:text-white sm:text-5xl">{employee.name}</h1>
          <div className="mt-4 h-1 w-12 rounded-full bg-saffron" />
          <p className="mt-4 text-sm font-semibold text-slate-700 dark:text-slate-200 sm:text-base">
            Employee ID: {employee.id} <span className="mx-2 text-slate-400">|</span> Department: {employee.department}
          </p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">{pageDescriptions[activePage]}</p>
        </div>
        <div className="hidden rounded-3xl bg-white/62 p-5 text-right shadow-glass backdrop-blur-md dark:bg-slate-950/54 md:block">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-navy dark:text-white">BSP</p>
          <p className="text-6xl font-black leading-none text-navy dark:text-white">70</p>
          <p className="text-xs font-black uppercase tracking-wide text-navy dark:text-blue-100">Years of<br />Steeling India</p>
        </div>
      </div>
    </section>
  );
}

function PageContent({
  activePage,
  globalSearch,
  notify,
  openExpenseModal
}: {
  activePage: Page;
  globalSearch: string;
  notify: (message: string) => void;
  openExpenseModal: () => void;
}) {
  if (activePage === "Expenses") return <ExpensesPage search={globalSearch} notify={notify} openExpenseModal={openExpenseModal} />;
  if (activePage === "My Claims") return <ClaimsPage search={globalSearch} notify={notify} />;
  if (activePage === "Track Status") return <TrackStatusPage notify={notify} />;
  if (activePage === "History") return <HistoryPage search={globalSearch} notify={notify} />;
  if (activePage === "Profile") return <ProfilePage notify={notify} />;
  return <DashboardPage search={globalSearch} notify={notify} />;
}

function DashboardPage({ search, notify }: { search: string; notify: (message: string) => void }) {
  const recentClaims = filterRows(claims, search).slice(0, 3);
  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Expenses" value="₹ 48,750" icon={Wallet} color="#2563EB" series={miniSeries.expenses} />
        <StatCard title="Claims Approved" value="₹ 32,450" icon={IndianRupee} color="#22C55E" series={miniSeries.approved} />
        <StatCard title="Claims In Review" value="1" icon={Clock} color="#F59E0B" series={miniSeries.review} />
        <StatCard title="Claims Rejected" value="₹ 8,300" icon={XCircle} color="#8B5CF6" series={miniSeries.rejected} />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.1fr_1fr]">
        <Panel title="My Overview">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <OverviewCard icon={Plane} label="Travel Requests" value="2" badge="1 Pending" tone="blue" />
            <OverviewCard icon={IndianRupee} label="Expenses Submitted" value="5" badge="This Month" tone="green" />
            <OverviewCard icon={FileText} label="Claims Approved" value="3" badge="This Month" tone="purple" />
            <OverviewCard icon={Clock} label="Claims In Review" value="1" badge="This Month" tone="orange" />
          </div>
          <div className="mt-5 h-14 rounded-b-2xl bg-gradient-to-r from-blue-100 via-slate-50 to-blue-100 opacity-80 dark:from-blue-950/30 dark:via-slate-900 dark:to-blue-950/30" />
        </Panel>
        <Panel title="Claims Status">
          <ClaimDonut />
        </Panel>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.1fr_1fr]">
        <Panel title="Recent Activity">
          <div className="space-y-4">
            {activities.map((item) => (
              <ActivityRow key={item.title} item={item} />
            ))}
          </div>
          <ActionLink label="View All Activity" onClick={() => notify("Activity history is ready to review.")} />
        </Panel>
        <Panel
          title="Recent Claims"
          action={<button onClick={() => notify("Showing all recent claims.")} className="flex items-center gap-2 text-sm font-bold text-royal">View All <ArrowRight className="h-4 w-4" /></button>}
        >
          <div className="space-y-3">
            {recentClaims.map((claim) => (
              <RecentClaim key={claim.id} claim={claim} notify={notify} />
            ))}
            {recentClaims.length === 0 && <EmptyState title="No matching claims" />}
          </div>
        </Panel>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
  color,
  series
}: {
  title: string;
  value: string;
  icon: React.ElementType;
  color: string;
  series: number[];
}) {
  return (
    <motion.div whileHover={{ y: -5, scale: 1.01 }} className="glass-card rounded-[20px] p-5">
      <div className="flex items-start gap-4">
        <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full" style={{ backgroundColor: `${color}20`, color }}>
          <Icon className="h-8 w-8" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">{title}</p>
          <p className="mt-3 text-3xl font-black text-navy dark:text-white">{value}</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-[90px_1fr] items-end gap-4">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">This Month</p>
        <MiniChart data={series} color={color} />
      </div>
    </motion.div>
  );
}

function OverviewCard({
  icon: Icon,
  label,
  value,
  badge,
  tone
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  badge: string;
  tone: "blue" | "green" | "purple" | "orange";
}) {
  const tones = {
    blue: "bg-blue-100 text-royal dark:bg-blue-500/15 dark:text-blue-300",
    green: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300",
    purple: "bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300",
    orange: "bg-orange-100 text-orange-600 dark:bg-orange-500/15 dark:text-orange-300"
  };
  return (
    <motion.div whileHover={{ y: -4 }} className="flex flex-col items-center border-slate-200 px-3 py-4 text-center dark:border-slate-800 sm:border-r last:border-r-0">
      <div className={cn("grid h-16 w-16 place-items-center rounded-full", tones[tone])}>
        <Icon className="h-8 w-8" />
      </div>
      <p className="mt-3 text-3xl font-black text-navy dark:text-white">{value}</p>
      <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">{label}</p>
      <span className={cn("mt-3 rounded-full px-4 py-1 text-xs font-bold", tones[tone])}>{badge}</span>
    </motion.div>
  );
}

function ExpensesPage({
  search,
  notify,
  openExpenseModal
}: {
  search: string;
  notify: (message: string) => void;
  openExpenseModal: () => void;
}) {
  const [sortKey, setSortKey] = useState<"date" | "amount">("date");
  const rows = filterRows(expenses, search).sort((a, b) => (sortKey === "amount" ? b.amount - a.amount : a.date.localeCompare(b.date)));
  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricTile icon={Wallet} label="Total Expenses" value="₹ 48,750" tone="blue" />
        <MetricTile icon={Clock} label="Pending Expenses" value="₹ 8,300" meta="3 expenses" tone="orange" />
        <MetricTile icon={IndianRupee} label="Approved Amount" value="₹ 32,450" tone="green" />
        <MetricTile icon={XCircle} label="Rejected Amount" value="₹ 8,300" tone="red" />
      </div>
      <Panel
        title="Expenses List"
        action={
          <div className="flex gap-2">
            <button onClick={() => setSortKey(sortKey === "date" ? "amount" : "date")} className="hidden items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold text-navy dark:border-slate-800 dark:text-white sm:flex">
              <Filter className="h-4 w-4" /> Sort by {sortKey === "date" ? "Amount" : "Date"}
            </button>
            <button onClick={openExpenseModal} className="flex items-center gap-2 rounded-xl bg-royal px-4 py-2 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:scale-[1.02]">
              <Plus className="h-4 w-4" /> Add Expense
            </button>
          </div>
        }
      >
        <DataTable>
          <thead>
            <tr>
              <Th>Date</Th>
              <Th>Category</Th>
              <Th>Description</Th>
              <Th>Amount (₹)</Th>
              <Th>Bill</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <motion.tr key={row.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-b border-slate-100 last:border-0 dark:border-slate-800">
                <Td>{row.date}</Td>
                <Td>{row.category}</Td>
                <Td>{row.description}</Td>
                <Td>{row.amount.toLocaleString("en-IN")}</Td>
                <Td>{row.bill ? <FileText className="h-4 w-4 text-royal" /> : <span className="text-slate-400">-</span>}</Td>
                <Td><StatusBadge status={row.status} /></Td>
                <Td><IconButton label="Expense actions" onClick={() => notify(`Opened actions for ${row.id}`)}><MoreVertical className="h-4 w-4" /></IconButton></Td>
              </motion.tr>
            ))}
          </tbody>
        </DataTable>
        {rows.length === 0 && <EmptyState title="No expenses found" />}
        <ActionLink label="View More" onClick={() => notify("More expenses loaded.")} />
      </Panel>
    </div>
  );
}

function ClaimsPage({ search, notify }: { search: string; notify: (message: string) => void }) {
  const rows = filterRows(claims, search);
  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricTile icon={FileText} label="Total Claims" value="6" meta="This Month" tone="blue" />
        <MetricTile icon={IndianRupee} label="Approved Claims" value="3" meta="₹ 32,450" tone="green" />
        <MetricTile icon={Clock} label="In Review" value="1" meta="₹ 8,300" tone="orange" />
        <MetricTile icon={XCircle} label="Rejected Claims" value="2" meta="₹ 8,300" tone="red" />
      </div>
      <Panel title="Claims List">
        <DataTable>
          <thead>
            <tr>
              <Th>Claim ID</Th>
              <Th>Purpose</Th>
              <Th>Travel Date</Th>
              <Th>Total Amount (₹)</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <motion.tr key={row.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-b border-slate-100 last:border-0 dark:border-slate-800">
                <Td>{row.id}</Td>
                <Td>{row.purpose}</Td>
                <Td>{row.travelDate}</Td>
                <Td>{row.amount.toLocaleString("en-IN")}</Td>
                <Td><StatusBadge status={row.status} /></Td>
                <Td>
                  <div className="flex gap-2">
                    <IconButton label="View claim" onClick={() => notify(`Viewing ${row.id}`)}><Eye className="h-4 w-4" /></IconButton>
                    <IconButton label="Download claim PDF" onClick={() => downloadTextFile(`${row.id}.pdf.txt`, `SAIL BSP Claim\n${row.id}\n${row.purpose}\n${formatCurrency(row.amount)}`)}><Download className="h-4 w-4" /></IconButton>
                  </div>
                </Td>
              </motion.tr>
            ))}
          </tbody>
        </DataTable>
        {rows.length === 0 && <EmptyState title="No claims found" />}
        <ActionLink label="View More" onClick={() => notify("Additional claims are ready.")} />
      </Panel>
    </div>
  );
}

function TrackStatusPage({ notify }: { notify: (message: string) => void }) {
  const [claimId, setClaimId] = useState("CLM-2505-001");
  const trackedClaim = claims.find((claim) => claim.id.toLowerCase() === claimId.toLowerCase()) ?? claims[0];
  return (
    <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
      <Panel title="Track Claim">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            value={claimId}
            onChange={(event) => setClaimId(event.target.value)}
            className="h-12 flex-1 rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-royal focus:ring-4 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900"
            placeholder="Enter Claim ID (e.g. CLM-2505-001)"
          />
          <button onClick={() => notify(`Tracking ${trackedClaim.id}`)} className="rounded-2xl bg-royal px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:scale-[1.02]">
            Track
          </button>
        </div>
        <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 dark:border-blue-900/60 dark:bg-blue-950/25">
          <div className="flex items-center justify-between gap-3">
            <p className="font-black text-royal">Claim ID: {trackedClaim.id}</p>
            <StatusBadge status={trackedClaim.status} />
          </div>
          <div className="mt-5 grid gap-4 text-sm sm:grid-cols-4">
            <InfoItem label="Purpose" value={trackedClaim.purpose} />
            <InfoItem label="Travel Date" value={trackedClaim.travelDate} />
            <InfoItem label="Submitted On" value={trackedClaim.submitted} />
            <InfoItem label="Total Amount" value={formatCurrency(trackedClaim.amount)} />
          </div>
        </div>
      </Panel>
      <Panel title="Status Timeline">
        <div className="space-y-0">
          {timeline.map((item, index) => (
            <div key={item.title} className="relative flex gap-4 pb-7 last:pb-0">
              {index < timeline.length - 1 && <div className="absolute left-[13px] top-7 h-full w-0.5 bg-slate-200 dark:bg-slate-800" />}
              <div className={cn("relative z-10 mt-1 h-7 w-7 rounded-full border-4 border-white dark:border-slate-900", item.done ? "bg-saffron" : "bg-slate-300 dark:bg-slate-700")} />
              <div>
                <p className="font-black text-navy dark:text-white">{item.title}</p>
                <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">{item.date}</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function HistoryPage({ search, notify }: { search: string; notify: (message: string) => void }) {
  const [tab, setTab] = useState<"Claims History" | "Expense History">("Claims History");
  const [status, setStatus] = useState("All Status");
  const rows = tab === "Claims History" ? claims : expenses.map((expense) => ({
    id: expense.id,
    purpose: expense.description,
    travelDate: expense.date,
    amount: expense.amount,
    status: expense.status
  }));
  const filteredRows = filterRows(rows, search).filter((row) => status === "All Status" || row.status === status);
  const exportRows = () => {
    const contents = filteredRows.map((row) => `${row.id},${row.purpose},${row.travelDate},${row.amount},${row.status}`).join("\n");
    downloadTextFile("sail-bsp-history.csv", `ID,Purpose,Date,Amount,Status\n${contents}`);
    notify("History exported.");
  };
  return (
    <Panel
      title="History"
      action={<button onClick={exportRows} className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-royal dark:border-slate-800"><Download className="h-4 w-4" /> Export</button>}
    >
      <div className="mb-5 flex flex-col justify-between gap-3 lg:flex-row">
        <div className="flex rounded-2xl border border-slate-200 bg-slate-50 p-1 dark:border-slate-800 dark:bg-slate-900">
          {(["Claims History", "Expense History"] as const).map((item) => (
            <button key={item} onClick={() => setTab(item)} className={cn("rounded-xl px-4 py-2 text-sm font-bold transition", tab === item ? "bg-white text-royal shadow-sm dark:bg-slate-800" : "text-slate-500")}>{item}</button>
          ))}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 text-sm font-semibold dark:border-slate-800 dark:bg-slate-900">
            <CalendarDays className="h-4 w-4 text-royal" />
            01 Apr 2025 - 31 May 2025
          </label>
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="h-11 rounded-2xl border border-slate-200 bg-white px-3 text-sm font-semibold outline-none dark:border-slate-800 dark:bg-slate-900">
            <option>All Status</option>
            <option>Approved</option>
            <option>In Review</option>
            <option>Rejected</option>
            <option>Pending</option>
          </select>
        </div>
      </div>
      <DataTable>
        <thead>
          <tr>
            <Th>Claim ID</Th>
            <Th>Purpose</Th>
            <Th>Date</Th>
            <Th>Amount (₹)</Th>
            <Th>Status</Th>
          </tr>
        </thead>
        <tbody>
          {filteredRows.map((row) => (
            <motion.tr key={row.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-b border-slate-100 last:border-0 dark:border-slate-800">
              <Td>{row.id}</Td>
              <Td>{row.purpose}</Td>
              <Td>{row.travelDate}</Td>
              <Td>{row.amount.toLocaleString("en-IN")}</Td>
              <Td><StatusBadge status={row.status} /></Td>
            </motion.tr>
          ))}
        </tbody>
      </DataTable>
      {filteredRows.length === 0 && <EmptyState title="No history records" />}
      <ActionLink label="View More" onClick={() => notify("More history records loaded.")} />
    </Panel>
  );
}

function ProfilePage({ notify }: { notify: (message: string) => void }) {
  const form = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" }
  });
  const onSubmit = () => {
    notify("Password updated successfully.");
    form.reset();
  };
  return (
    <div className="grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
      <Panel title="Profile Card">
        <div className="flex flex-col items-center text-center">
          <div className="relative grid h-32 w-32 place-items-center rounded-full bg-royal text-white shadow-xl shadow-blue-500/25">
            <User className="h-20 w-20" />
            <button className="absolute bottom-1 right-2 grid h-9 w-9 place-items-center rounded-full bg-white text-royal shadow-md" aria-label="Change avatar">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <h2 className="mt-5 text-2xl font-black text-navy dark:text-white">{employee.name}</h2>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Employee ID: {employee.id}</p>
        </div>
        <div className="mt-6 space-y-4">
          <InfoLine label="Department" value={employee.department} />
          <InfoLine label="Designation" value={employee.designation} />
          <InfoLine label="Email" value={employee.email} />
          <InfoLine label="Phone" value={employee.phone} />
          <InfoLine label="Location" value={employee.location} />
        </div>
        <button onClick={() => notify("Profile edit mode enabled.")} className="mt-6 w-full rounded-2xl border border-royal px-5 py-3 text-sm font-black text-royal transition hover:bg-blue-50 dark:hover:bg-blue-950/30">
          Edit Profile
        </button>
      </Panel>
      <div className="space-y-5">
        <Panel title="Change Password">
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <PasswordInput label="Current Password" registration={form.register("currentPassword")} error={form.formState.errors.currentPassword?.message} />
            <PasswordInput label="New Password" registration={form.register("newPassword")} error={form.formState.errors.newPassword?.message} />
            <PasswordInput label="Confirm New Password" registration={form.register("confirmPassword")} error={form.formState.errors.confirmPassword?.message} />
            <button className="mt-2 rounded-2xl bg-royal px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-500/20 transition hover:scale-[1.01]">
              Update Password
            </button>
          </form>
        </Panel>
        <Panel title="Account Security">
          <div className="grid gap-4 sm:grid-cols-2">
            <SecurityTile icon={ShieldCheck} label="Last Login" value={employee.lastLogin} />
            <SecurityTile icon={LockKeyhole} label="Password Changed" value={employee.passwordChanged} />
          </div>
        </Panel>
      </div>
    </div>
  );
}

function AddExpenseModal({ open, onClose, notify }: { open: boolean; onClose: () => void; notify: (message: string) => void }) {
  const form = useForm<ExpenseForm>({
    resolver: zodResolver(expenseSchema),
    defaultValues: { category: "Travel", description: "", amount: 0 }
  });
  const [dragging, setDragging] = useState(false);
  const submit = (data: ExpenseForm) => {
    notify(`${data.category} expense submitted for approval.`);
    form.reset({ category: "Travel", description: "", amount: 0 });
    onClose();
  };
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/58 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div initial={{ scale: 0.96, y: 12 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 12 }} className="glass-card w-full max-w-2xl rounded-[20px] p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-black text-navy dark:text-white">Add Expense</h3>
              <IconButton label="Close modal" onClick={onClose}><X className="h-4 w-4" /></IconButton>
            </div>
            <form onSubmit={form.handleSubmit(submit)} className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-bold text-slate-600 dark:text-slate-300">
                  Category
                  <select {...form.register("category")} className="h-12 rounded-2xl border border-slate-200 bg-white px-4 outline-none dark:border-slate-800 dark:bg-slate-900">
                    <option>Travel</option>
                    <option>Food</option>
                    <option>Stay</option>
                    <option>Miscellaneous</option>
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-bold text-slate-600 dark:text-slate-300">
                  Amount
                  <input type="number" {...form.register("amount")} className="h-12 rounded-2xl border border-slate-200 bg-white px-4 outline-none dark:border-slate-800 dark:bg-slate-900" />
                  {form.formState.errors.amount?.message && <span className="text-xs text-danger">{form.formState.errors.amount.message}</span>}
                </label>
              </div>
              <label className="grid gap-2 text-sm font-bold text-slate-600 dark:text-slate-300">
                Description
                <input {...form.register("description")} className="h-12 rounded-2xl border border-slate-200 bg-white px-4 outline-none dark:border-slate-800 dark:bg-slate-900" placeholder="Hotel stay, taxi fare, meal..." />
                {form.formState.errors.description?.message && <span className="text-xs text-danger">{form.formState.errors.description.message}</span>}
              </label>
              <div
                onDragOver={(event) => {
                  event.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(event) => {
                  event.preventDefault();
                  setDragging(false);
                  notify("Bill uploaded.");
                }}
                className={cn("grid min-h-36 place-items-center rounded-2xl border-2 border-dashed p-5 text-center transition", dragging ? "border-royal bg-blue-50 dark:bg-blue-950/30" : "border-slate-200 dark:border-slate-800")}
              >
                <div>
                  <UploadCloud className="mx-auto h-8 w-8 text-royal" />
                  <p className="mt-2 font-black text-navy dark:text-white">Upload bills</p>
                  <p className="text-sm text-slate-500">Drag and drop PDF/JPG/PNG files here</p>
                </div>
              </div>
              <button className="rounded-2xl bg-royal px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-500/20 transition hover:scale-[1.01]">
                Submit Expense
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MetricTile({
  icon: Icon,
  label,
  value,
  meta,
  tone
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  meta?: string;
  tone: "blue" | "green" | "orange" | "red";
}) {
  const colors = {
    blue: "bg-blue-100 text-royal dark:bg-blue-500/15 dark:text-blue-300",
    green: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300",
    orange: "bg-orange-100 text-orange-600 dark:bg-orange-500/15 dark:text-orange-300",
    red: "bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-300"
  };
  return (
    <motion.div whileHover={{ y: -4 }} className="glass-card flex items-center gap-4 rounded-[20px] p-5">
      <div className={cn("grid h-14 w-14 place-items-center rounded-2xl", colors[tone])}>
        <Icon className="h-7 w-7" />
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{label}</p>
        <p className="mt-1 text-2xl font-black text-navy dark:text-white">{value}</p>
        {meta && <p className={cn("mt-1 text-xs font-black", colors[tone].split(" ").slice(1, 2).join(" "))}>{meta}</p>}
      </div>
    </motion.div>
  );
}

function Panel({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="glass-card rounded-[20px] p-5">
      <div className="mb-5 flex items-start justify-between gap-4">
        <h2 className="card-title-underline text-lg font-black text-navy dark:text-white">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function DataTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="table-scroll rounded-2xl border border-slate-100 dark:border-slate-800">
      <table className="w-full min-w-[760px] border-collapse text-left text-sm">{children}</table>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="bg-slate-50 px-4 py-3 text-xs font-black uppercase text-slate-500 dark:bg-slate-900 dark:text-slate-400">{children}</th>;
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-4 font-semibold text-slate-700 dark:text-slate-200">{children}</td>;
}

function StatusBadge({ status }: { status: Status }) {
  return <span className={cn("inline-flex rounded-full px-3 py-1 text-xs font-black", statusStyles[status])}>{status}</span>;
}

function ActivityRow({ item }: { item: (typeof activities)[number] }) {
  const Icon = item.kind === "travel" ? Plane : item.kind === "expense" ? IndianRupee : AlertTriangle;
  return (
    <div className="flex items-center gap-4 border-b border-slate-100 pb-4 last:border-0 dark:border-slate-800">
      <div className="grid h-12 w-12 place-items-center rounded-full bg-blue-100 text-royal dark:bg-blue-500/15 dark:text-blue-300">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-black text-navy dark:text-white">{item.title}</p>
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{item.date} <span className="mx-1">•</span> {item.detail}</p>
      </div>
      <StatusBadge status={item.status} />
    </div>
  );
}

function RecentClaim({ claim, notify }: { claim: (typeof claims)[number]; notify: (message: string) => void }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-100 p-3 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900">
      <div className="grid h-12 w-12 place-items-center rounded-full bg-blue-100 text-royal dark:bg-blue-500/15 dark:text-blue-300">
        <FileText className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-black text-navy dark:text-white">{claim.purpose}</p>
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{claim.travelDate} <span className="mx-1">•</span> {formatCurrency(claim.amount)}</p>
      </div>
      <StatusBadge status={claim.status} />
      <IconButton label="Download claim" onClick={() => notify(`Downloaded ${claim.id}`)}><Download className="h-4 w-4" /></IconButton>
    </div>
  );
}

function ActionLink({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="mx-auto mt-5 flex items-center gap-2 text-sm font-black text-royal">
      {label} <ArrowDown className="h-4 w-4" />
    </button>
  );
}

function EmptyState({ title }: { title: string }) {
  return (
    <div className="grid min-h-40 place-items-center text-center">
      <div>
        <Building2 className="mx-auto h-10 w-10 text-slate-300" />
        <p className="mt-3 font-black text-slate-500 dark:text-slate-300">{title}</p>
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-black uppercase text-slate-400">{label}</p>
      <p className="mt-1 font-bold text-navy dark:text-white">{value}</p>
    </div>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3 last:border-0 dark:border-slate-800">
      <span className="text-sm font-black text-slate-500 dark:text-slate-400">{label}</span>
      <span className="max-w-[62%] text-right text-sm font-semibold text-navy dark:text-white">{value}</span>
    </div>
  );
}

function SecurityTile({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
      <Icon className="h-6 w-6 text-royal" />
      <p className="mt-3 text-sm font-black text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-1 font-bold text-navy dark:text-white">{value}</p>
    </div>
  );
}

function PasswordInput({
  label,
  registration,
  error
}: {
  label: string;
  registration: ReturnType<typeof useForm<PasswordForm>>["register"] extends (name: infer Name) => infer Registration ? Registration : never;
  error?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-600 dark:text-slate-300">
      {label}
      <input type="password" {...registration} className="h-12 rounded-2xl border border-slate-200 bg-white px-4 outline-none focus:border-royal focus:ring-4 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:focus:ring-blue-950" />
      {error && <span className="text-xs text-danger">{error}</span>}
    </label>
  );
}

function SkeletonScreen() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="glass-card h-40 animate-pulse rounded-[20px] bg-slate-200/60 dark:bg-slate-800/60" />
      ))}
    </div>
  );
}

function Footer() {
  return (
    <footer className="industrial-footer mt-8 overflow-hidden rounded-t-[28px] px-5 py-5 text-center text-white shadow-glass">
      <p className="text-lg font-semibold">Together We Build, Together We Grow. <span className="mx-3 text-white/45">|</span> <span className="font-black text-saffron">BSP</span></p>
    </footer>
  );
}

function filterRows<T extends Record<string, unknown>>(rows: T[], search: string) {
  const needle = search.trim().toLowerCase();
  if (!needle) return rows;
  return rows.filter((row) => Object.values(row).join(" ").toLowerCase().includes(needle));
}
