export type Status = "Approved" | "In Review" | "Rejected" | "Draft" | "Pending";

export const employee = {
  name: "Saket Raj Tiwari",
  id: "BSP10245",
  department: "IT Services",
  designation: "Software Developer",
  email: "saket.tiwari@bsp.in",
  phone: "+91 98765 43210",
  location: "Bhilai Steel Plant, Chhattisgarh",
  lastLogin: "16 May 2025 - 09:15 AM",
  passwordChanged: "10 Apr 2025"
};

export const miniSeries = {
  expenses: [18, 21, 20, 25, 29, 26, 24, 28, 34, 31, 24, 22, 27, 29, 26],
  approved: [10, 12, 16, 18, 24, 20, 16, 14, 18, 23, 25, 19, 16, 18, 19],
  review: [4, 5, 5, 7, 10, 12, 9, 8, 10, 13, 12, 9, 8, 10, 11],
  rejected: [2, 3, 4, 8, 6, 5, 7, 9, 6, 5, 6, 7, 6, 7, 7]
};

export const expenses = [
  { id: "EXP-2505-001", date: "16 May 2025", category: "Travel", description: "Raipur to Durg (Taxi)", amount: 1250, bill: true, status: "Pending" as Status },
  { id: "EXP-2505-002", date: "15 May 2025", category: "Food", description: "Team Lunch", amount: 850, bill: true, status: "Approved" as Status },
  { id: "EXP-2505-003", date: "14 May 2025", category: "Stay", description: "Hotel Stay - Raipur", amount: 2400, bill: true, status: "Approved" as Status },
  { id: "EXP-2505-004", date: "14 May 2025", category: "Travel", description: "Auto Fare", amount: 320, bill: true, status: "Rejected" as Status },
  { id: "EXP-2505-005", date: "13 May 2025", category: "Miscellaneous", description: "Stationery", amount: 180, bill: true, status: "Pending" as Status },
  { id: "EXP-2504-006", date: "29 Apr 2025", category: "Food", description: "Official Dinner", amount: 1100, bill: false, status: "Draft" as Status }
];

export const claims = [
  { id: "CLM-2505-001", purpose: "Raipur Official Visit", travelDate: "14 May 2025", submitted: "14 May 2025", amount: 8300, status: "In Review" as Status },
  { id: "CLM-2505-002", purpose: "Vendor Meeting - Durg", travelDate: "05 May 2025", submitted: "05 May 2025", amount: 3450, status: "Approved" as Status },
  { id: "CLM-2504-003", purpose: "Training Program - Raipur", travelDate: "28 Apr 2025", submitted: "29 Apr 2025", amount: 2150, status: "Approved" as Status },
  { id: "CLM-2504-008", purpose: "Plant Inspection", travelDate: "20 Apr 2025", submitted: "20 Apr 2025", amount: 1800, status: "Rejected" as Status },
  { id: "CLM-2504-005", purpose: "Safety Audit Visit", travelDate: "10 Apr 2025", submitted: "11 Apr 2025", amount: 2250, status: "Rejected" as Status },
  { id: "CLM-2504-001", purpose: "Raipur Official Visit", travelDate: "02 Apr 2025", submitted: "02 Apr 2025", amount: 3900, status: "Approved" as Status }
];

export const activities = [
  { title: "Travel request to Raipur approved", date: "16 May 2025", detail: "Approved by Manager", status: "Approved" as Status, kind: "travel" },
  { title: "Expense claim submitted for Raipur trip", date: "14 May 2025", detail: "₹8,300", status: "In Review" as Status, kind: "expense" },
  { title: "Expense claim rejected", date: "10 May 2025", detail: "Reason: Bill not clear", status: "Rejected" as Status, kind: "rejected" }
];

export const claimStatusData = [
  { name: "Approved", value: 3, color: "#22C55E" },
  { name: "In Review", value: 1, color: "#F59E0B" },
  { name: "Rejected", value: 1, color: "#EF4444" },
  { name: "Draft", value: 1, color: "#94A3B8" }
];

export const timeline = [
  { title: "Claim Submitted", date: "14 May 2025 - 10:30 AM", description: "Your claim has been submitted successfully.", done: true },
  { title: "Under Review", date: "15 May 2025 - 02:15 PM", description: "Your claim is under review by your reporting manager.", done: true },
  { title: "Approved by Manager", date: "Pending", description: "Awaiting manager approval.", done: false },
  { title: "Approved by Finance", date: "Pending", description: "Finance verification will start after manager approval.", done: false },
  { title: "Payment Initiated", date: "Pending", description: "Reimbursement will be released to payroll.", done: false }
];
