"use client";
import DealsBarchart from "./DealsBarchart";
import { useDashboardStats } from "@/hooks/dashboard.api";

export default function DashboardMain() {
  const { data } = useDashboardStats();
  const analytics = data?.data?.analytics_data;

  return (
    <div className="space-y-6">
      <DealsBarchart analytics={analytics} />
    </div>
  );
}
