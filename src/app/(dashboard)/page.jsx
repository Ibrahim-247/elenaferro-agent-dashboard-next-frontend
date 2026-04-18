"use client";
import CalendarView from "@/components/CalendarComponents/CalendarView";
import DashboardStats from "@/components/DashboardComponents/DashboardStats";
import TaskList from "@/components/DashboardComponents/TaskList";
import { useDashboardStats } from "@/hooks/dashboard.api";

export default function Page() {
  const { data } = useDashboardStats();
  const stat = data?.data?.stat;

  return (
    <div className="space-y-6">
      <DashboardStats stat={stat} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <CalendarView />
        </div>
        <div className="h-[calc(100vh-140px)] min-h-175">
          <TaskList />
        </div>
      </div>
    </div>
  );
}
