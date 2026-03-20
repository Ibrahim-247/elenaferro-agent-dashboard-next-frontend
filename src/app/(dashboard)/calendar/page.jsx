"use client";
import CalendarView from "@/components/CalendarComponents/CalendarView";

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-[#1D1235]">Calendar</h1>
        <p className="text-[#798090] text-sm md:text-base font-normal">
          View and manage your tasks, transactions, and appointments.
        </p>
      </div>
      <CalendarView />
    </div>
  );
}
