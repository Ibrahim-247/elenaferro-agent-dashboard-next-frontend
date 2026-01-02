import React from "react";
import StatsCard from "../common/StatsCard";
import { CircleDollarSign, FileText, ListChecks, Users } from "lucide-react";

export default function DashboardStats() {
  // stats data
  const stats = [
    {
      name: "New Leads",
      value: "8",
      icon: <Users />,
      bg: "#EFF6FF",
      color: "#3853FF",
    },
    {
      name: "Active Transactions",
      value: "8",
      icon: <CircleDollarSign />,
      bg: "#F0FDF4",
      color: "#2FA75F",
    },
    {
      name: "Pending Documents",
      value: "8",
      icon: <FileText />,
      bg: "#FAF5FF",
      color: "#A633FA",
    },
    {
      name: "New Leads",
      value: "8",
      icon: <ListChecks />,
      bg: "#FFF7ED",
      color: "#F7763D",
    },
  ];
  return (
    <div className="grid grid-cols-4 gap-5">
      {stats?.map((item, index) => (
        <StatsCard item={item} key={index} />
      ))}
    </div>
  );
}
