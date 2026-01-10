"use client";
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
import { useTransactionlist } from "@/hooks/transaction.api";

export default function TransactionStats() {
  // transaction data
  const { data: transactions } = useTransactionlist();
  const data = transactions?.data;

  // stats data
  const stats = [
    {
      name: "Total Transactions",
      value: data?.all || 0,
      icon: <CircleDollarSign />,
      bg: "#EFF6FF",
      color: "#3853FF",
    },
    {
      name: "Active",
      value: data?.active || 0,
      icon: <CircleCheck />,
      bg: "#F0FDF4",
      color: "#2FA75F",
    },
    {
      name: "Pending",
      value: data?.pending || 0,
      icon: <Clock4 />,
      bg: "#FFF8E2",
      color: "#FFCC00",
    },
    {
      name: "Closed",
      value: data?.closed || 0,
      icon: <CheckCheck />,
      bg: "#F6F6F6",
      color: "#798090",
    },
    {
      name: "Canceled",
      value: data?.cancelled || 0,
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
