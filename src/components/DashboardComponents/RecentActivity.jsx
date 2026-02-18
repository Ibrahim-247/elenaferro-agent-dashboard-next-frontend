"use client";
import { useNotificationlist } from "@/hooks/notification.api";
import { Bell } from "lucide-react";
import React from "react";
import { Spinner } from "../ui/spinner";

export default function RecentActivity() {
  const { data, isPending } = useNotificationlist();
  const notification = data?.data?.notifications;

  return (
    <div className="bg-white p-4 lg:p-8 rounded-2xl border border-gray-100">
      <h4 className="text-2xl lg:text-3xl font-semibold">Recent Activity</h4>
      <div className="max-h-120 overflow-auto h-full space-y-2 mt-6 lg:mt-8 lg:pr-8 custom_scroll">
        {isPending ? (
          <div className="h-40 text-center text-base w-full flex items-center justify-center">
            <div className="flex items-center justify-center gap-2">
              <Spinner /> Loading...
            </div>
          </div>
        ) : notification?.length > 0 ? (
          notification?.map((item, index) => (
            <div
              key={index}
              className="flex items-start lg:items-center gap-4 py-4 border-b border-gray-50 last:border-0"
            >
              <div className="bg-purple-50 text-purple-600 size-10 lg:size-12 rounded-lg flex items-center justify-center shrink-0">
                <Bell className="size-5 lg:size-6" />
              </div>
              <div className="space-y-1 min-w-0">
                <h4 className="text-base lg:text-xl font-medium text-gray-900 leading-tight">
                  {item?.message}
                </h4>
                <p className="text-xs lg:text-sm font-normal text-gray-500">
                  {item?.time_ago}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="h-40 text-center text-base">
            <div className="flex flex-col items-center justify-center gap-2">
              <Bell className="text-gray-300 size-10 lg:size-13" />
              <p className="text-gray-500">No activity found</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
