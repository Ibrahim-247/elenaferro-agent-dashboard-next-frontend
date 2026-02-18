"use client";
import { useLeadlist } from "@/hooks/crm.api";
import StatsCard from "../common/StatsCard";
import { CircleDollarSign, FileText, ListChecks, Users } from "lucide-react";

export default function CrmStats() {
  // lead list hooks
  const { data } = useLeadlist();

  // stats data
  const stats = [
    {
      name: "New Leads",
      value: data?.data?.new || 0,
      icon: <Users />,
      bg: "#EFF6FF",
      color: "#3853FF",
    },
    {
      name: "Active Leads",
      value: data?.data?.all || 0,
      icon: <CircleDollarSign />,
      bg: "#F0FDF4",
      color: "#2FA75F",
    },
    {
      name: "Converted to clients",
      value: data?.data?.converted || 0,
      icon: <FileText />,
      bg: "#FAF5FF",
      color: "#A633FA",
    },
    {
      name: "Follow-ups Due",
      value: data?.data?.lost || 0,
      icon: <ListChecks />,
      bg: "#FFF7ED",
      color: "#F7763D",
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats?.map((item, index) => (
        <StatsCard item={item} key={index} />
      ))}
    </div>
  );
}
