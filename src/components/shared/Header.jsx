"use client";
import { useProfileInfo } from "@/hooks/auth.api";
import {
  useAllNotificationRead,
  useNotificationlist,
} from "@/hooks/notification.api";
import { Bell, FileText, Inbox, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Spinner } from "../ui/spinner";

export default function Header({ onMenuClick }) {
  const [greeting, setGreeting] = useState("");

  // profile info
  const { data } = useProfileInfo();
  const user = data?.data?.user;

  // notifications
  const { data: notify, isPending } = useNotificationlist();
  const notification = notify?.data?.notifications;

  // mark all as read
  const notificationMarkReadMutation = useAllNotificationRead();

  // greetings
  const updateGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) setGreeting("Good Morning");
    else if (hour >= 12 && hour < 17) setGreeting("Good Afternoon");
    else if (hour >= 17 && hour < 21) setGreeting("Good Evening");
    else setGreeting("Good Night");
  };

  useEffect(() => {
    updateGreeting();
    const interval = setInterval(updateGreeting, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-20 lg:h-23 w-full flex items-center justify-between px-4 lg:px-6 bg-white border-b border-gray-100">
      <div className="flex items-center gap-3 lg:gap-0">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Open menu"
        >
          <Menu className="size-6 text-gray-700" />
        </button>
        <h4 className="text-xl lg:text-2xl font-semibold truncate max-w-50 sm:max-w-none">
          <span className="hidden sm:inline">{greeting}, </span>
          {user?.name}
        </h4>
      </div>

      <div className="flex items-center gap-3 lg:gap-5">
        {/* notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative">
              <div className="size-10 lg:size-12 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors">
                <Bell className="size-5 text-gray-700" />
              </div>

              {/* unread badge */}
              {notify?.data?.has_new_notifications && (
                <span className="absolute -top-1 -right-1 size-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center border-2 border-white">
                  {notify?.data?.unread_count}
                </span>
              )}
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-[calc(100vw-32px)] sm:min-w-120 sm:w-full rounded-md p-0 shadow-lg"
          >
            <div className="flex items-center justify-between w-full sticky top-0 left-0 bg-white z-50 p-4 lg:p-5 border-b">
              <h4 className="text-xl lg:text-2xl font-semibold">
                Notifications
              </h4>
              {notify?.data?.unread_count > 0 && (
                <p
                  aria-disabled={notificationMarkReadMutation?.isPending}
                  onClick={() => notificationMarkReadMutation?.mutate()}
                  className="text-secondary text-base font-normal cursor-pointer aria-disabled:cursor-not-allowed aria-disabled:opacity-50 hover:underline"
                >
                  Mark all as read
                </p>
              )}
            </div>
            <div className="space-y-3 mt-2 p-4 lg:p-5 pt-0 max-h-100 overflow-y-auto custom_scroll">
              {isPending ? (
                <div className="h-40 text-center text-base flex items-center justify-center">
                  <div className="flex items-center justify-center gap-2">
                    <Spinner /> Loading...
                  </div>
                </div>
              ) : notification?.length > 0 ? (
                notification?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 border p-4 rounded-md w-full relative hover:bg-gray-50 transition-colors"
                  >
                    {!item?.is_read && (
                      <div className="bg-red-400 rounded-full size-2 absolute top-4 right-4"></div>
                    )}

                    <div className="bg-purple-50 text-purple-600 size-10 lg:size-12 rounded-lg flex items-center justify-center shrink-0">
                      <FileText className="size-5 lg:size-6" />
                    </div>
                    <div className="space-y-1 min-w-0">
                      <h4 className="text-sm lg:text-base font-medium text-gray-900 leading-tight">
                        {item?.message}
                      </h4>
                      <p className="text-xs lg:text-sm text-gray-500 font-normal">
                        {item?.time_ago}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-40 text-center text-base flex items-center justify-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Bell className="text-gray-300 size-10 lg:size-13" />
                    <p className="text-gray-500">No notifications yet</p>
                  </div>
                </div>
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-2 lg:gap-3 pl-2 border-l">
          <div className="bg-gray-100 rounded-full overflow-hidden size-10 lg:size-12 border border-gray-200 shrink-0">
            {/* Image placeholder or actual image */}
          </div>
          <div className="hidden md:block">
            <h5 className="text-base lg:text-lg font-medium leading-none">
              {user?.name}
            </h5>
            <p className="text-xs lg:text-sm text-gray-500 font-normal mt-0.5">
              Agent
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
