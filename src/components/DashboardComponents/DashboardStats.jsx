"use client";
import StatsCard from "../common/StatsCard";
import { CircleDollarSign, FileText, ListChecks, Users } from "lucide-react";

export default function DashboardStats({ stat }) {
  // stats data
  const stats = [
    {
      name: "New Leads",
      value: stat?.lead_count ?? 0,
      icon: <Users />,
      bg: "#EFF6FF",
      color: "#3853FF",
    },
    {
      name: "Active Transactions",
      value: stat?.active_transaction_count ?? 0,
      icon: <CircleDollarSign />,
      bg: "#F0FDF4",
      color: "#2FA75F",
    },
    {
      name: "Pending Documents",
      value: stat?.pending_document_count ?? 0,
      icon: <FileText />,
      bg: "#FAF5FF",
      color: "#A633FA",
    },
    {
      name: "Tasks Due Today",
      value: stat?.task_due_today_count ?? 0,
      icon: <ListChecks />,
      bg: "#FFF7ED",
      color: "#F7763D",
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
      {stats?.map((item, index) => (
        <StatsCard item={item} key={index} />
      ))}
    </div>
  );
}
