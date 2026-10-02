import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SAIL BSP Travel & Expense",
  description: "Employee Travel and Expense Management Dashboard for Bhilai Steel Plant"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
