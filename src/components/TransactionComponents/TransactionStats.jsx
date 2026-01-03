import React from "react";
import StatsCard from "../common/StatsCard";
import {
  Ban,
  CheckCheck,
  CircleCheck,
  CircleDollarSign,
  Clock4,
  FileText,
  ListChecks,
  Users,
} from "lucide-react";

export default function TransactionStats() {
  // stats data
  const stats = [
    {
      name: "Total Transactions",
      value: "8",
      icon: <CircleDollarSign />,
      bg: "#EFF6FF",
      color: "#3853FF",
    },
    {
      name: "Active",
      value: "8",
      icon: <CircleCheck />,
      bg: "#F0FDF4",
      color: "#2FA75F",
    },
    {
      name: "Pending",
      value: "8",
      icon: <Clock4 />,
      bg: "#FFF8E2",
      color: "#FFCC00",
    },
    {
      name: "Closed",
      value: "8",
      icon: <CheckCheck />,
      bg: "#F6F6F6",
      color: "#798090",
    },
    {
      name: "Canceled",
      value: "8",
      icon: <Ban />,
      bg: "#FFEBF1",
      color: "#FF383C",
    },
  ];
  return (
    <div className="grid grid-cols-5 gap-5">
      {stats?.map((item, index) => (
        <StatsCard item={item} key={index} />
      ))}
    </div>
  );
}
