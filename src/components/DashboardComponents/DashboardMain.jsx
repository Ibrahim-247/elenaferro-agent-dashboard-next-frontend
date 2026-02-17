"use client";
import React from "react";
import DashboardStats from "./DashboardStats";
import DealsBarchart from "./DealsBarchart";
import { useDashboardStats } from "@/hooks/dashboard.api";

export default function DashboardMain() {
  const { data } = useDashboardStats();
  const stat = data?.data;
  const analytics = data?.data?.analytics_data;

  return (
    <div className="space-y-6">
      <DashboardStats stat={stat} />
      <DealsBarchart analytics={analytics} />
    </div>
  );
}
