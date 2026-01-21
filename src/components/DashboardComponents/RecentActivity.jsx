"use client";
import { useNotificationlist } from "@/hooks/notification.api";
import { Bell } from "lucide-react";
import React from "react";
import { Spinner } from "../ui/spinner";

export default function RecentActivity() {
  const { data, isPending } = useNotificationlist();
  const notification = data?.data?.notifications;

  return (
    <div className="bg-white p-8 pr-0 rounded-2xl">
      <h4 className="text-3xl font-semibold">Recent Activity</h4>
      <div className="max-h-120 overflow-auto h-full space-y-2 mt-8 pr-8 custom_scroll">
        {isPending ? (
          <div className="h-40 text-center text-base w-full flex items-center justify-center">
            <div className="flex items-center justify-center gap-2">
              <Spinner /> Loading...
            </div>
          </div>
        ) : notification?.length > 0 ? (
          notification?.map((item, index) => (
            <div key={index} className="flex items-center gap-4 pb-5 border-b">
              <div className="bg-[#FAF5FF] text-[#A633FA] size-12 rounded-lg flex items-center justify-center">
                <Bell />
              </div>
              <div className="space-y-1">
                <h4 className="text-xl font-medium">{item?.message}</h4>
                <p className="text-sm font-normal">{item?.time_ago}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="h-40 text-center text-base">
            <div className="flex flex-col items-center justify-center gap-2">
              <Bell className="text-gray-400 size-13" /> No activity found
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
