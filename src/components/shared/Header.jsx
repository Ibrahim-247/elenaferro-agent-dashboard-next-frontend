"use client";
import { Bell, FileText, Inbox } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import avatar from "../../assets/avatar.png";
import { useProfileInfo } from "@/hooks/auth.api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  useAllNotificationRead,
  useNotificationlist,
} from "@/hooks/notification.api";
import { Spinner } from "../ui/spinner";

export default function Header() {
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
    <div className="h-23 w-full flex items-center justify-between px-6">
      <h4 className="text-2xl font-semibold">
        {greeting}, {user?.name}
      </h4>
      <div className="flex items-center gap-5">
        {/* notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative">
              <div className="size-12 rounded-lg bg-gray-100 border border-gray-300 flex items-center justify-center">
                <Bell className="size-5 text-gray-700" />
              </div>

              {/* unread badge */}
              {notify?.data?.has_new_notifications && (
                <span className="absolute -top-1 -right-1 size-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  {notify?.data?.unread_count}
                </span>
              )}
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="min-w-120 w-full rounded-md p-0"
          >
            <div className="flex items-center justify-between w-full sticky top-0 left-0 bg-white z-50 p-5">
              <h4 className="text-2xl font-semibold">Notifications</h4>
              {notify?.data?.unread_count > 0 && (
                <p
                  aria-disabled={notificationMarkReadMutation?.isPending}
                  onClick={() => notificationMarkReadMutation?.mutate()}
                  className="text-[#D5C69D] text-base font-normal cursor-pointer aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
                >
                  Mark all as read
                </p>
              )}
            </div>
            <div className="space-y-3 mt-2 p-5 pt-0">
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
                    className="flex items-center gap-4 border p-4 rounded-md max-w-120 w-full relative"
                  >
                    {!item?.is_read && (
                      <div className="bg-red-400 rounded-full size-2 absolute top-1/2 -translate-y-1/2 right-4"></div>
                    )}

                    <div className="bg-[#FAF5FF] text-[#A633FA] size-12 rounded-lg flex items-center justify-center">
                      <FileText />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-base font-medium text-ellipsis overflow-hidden text-nowrap max-w-75">
                        {item?.message}
                      </h4>
                      <p className="text-sm font-normal">{item?.time_ago}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-40 text-center text-base flex items-center justify-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Bell className="text-gray-400 size-13" /> No data found
                  </div>
                </div>
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex items-center gap-2">
          <div className="bg-gray-200 rounded-full overflow-hidden size-12">
            <Image
              src={user?.avatar ?? avatar}
              alt={user?.name ?? "name"}
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h5 className="text-lg font-medium">{user?.name}</h5>
            <p className="text-sm font-normal">Agent</p>
          </div>
        </div>
      </div>
    </div>
  );
}
