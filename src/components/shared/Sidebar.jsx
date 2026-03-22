"use client";
import Image from "next/image";
import logo from "../../assets/logo.png";
import logo2 from "../../assets/logo2.png";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import LogoutModal from "../Authentication/LogoutModal";
import slack from "../../assets/slack.png";
import Dashboard02Svg from "../svg/Dashboard02Svg";
import File01Svg from "../svg/File01Svg";
import TransactionSvg from "../svg/TransactionSvg";
import StickyNoteSvg from "../svg/StickyNoteSvg";
import Calendar04Svg from "../svg/Calendar04Svg";
import Folder02Svg from "../svg/Folder02Svg";
import Video02Svg from "../svg/Video02Svg";
import Setting07Svg from "../svg/Setting07Svg";
import UserMultiple02Svg from "../svg/UserMultiple02Svg";
import { cn } from "@/lib/utils";
import Logout02Svg from "../svg/Logout02Svg";

export default function Sidebar({
  mobile,
  onClose,
  isCollapsed,
  setIsCollapsed,
}) {
  const pathname = usePathname();

  const sidebar_menu = [
    { name: "Dashboard", path: "/", icon: <Dashboard02Svg /> },
    { name: "CRM", path: "/crm", icon: <UserMultiple02Svg /> },
    { name: "Documents", path: "/documents", icon: <File01Svg /> },
    { name: "Transactions", path: "/transaction", icon: <TransactionSvg /> },
    {
      name: "Performance & Tasks",
      path: "/performance_tasks",
      icon: <StickyNoteSvg />,
    },
    { name: "Calendar", path: "/calendar", icon: <Calendar04Svg /> },
    { name: "Public Folder", path: "/public_folder", icon: <Folder02Svg /> },
    { name: "Training Portal", path: "/training_portal", icon: <Video02Svg /> },
    { name: "Settings", path: "/settings", icon: <Setting07Svg /> },
  ];

  return (
    <div
      className={cn(
        "h-full flex flex-col bg-white border-r border-gray-100 transition-all duration-300 relative",
        mobile ? "w-full" : isCollapsed ? "w-20" : "w-88",
        "pt-3 pb-6",
      )}
    >
      {/* Collapse Toggle Button (Desktop Only) */}
      {!mobile && (
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-20 z-50 bg-white border border-gray-100 rounded-full p-1 shadow-md hover:bg-gray-50 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="size-4 text-secondary" />
          ) : (
            <ChevronLeft className="size-4 text-secondary" />
          )}
        </button>
      )}

      <div
        className={cn(
          "flex items-center mb-8 h-12",
          isCollapsed ? "justify-center px-2" : "justify-between px-6 lg:px-11",
        )}
      >
        {!isCollapsed ? (
          <Image src={logo} alt="logo" className="w-48 lg:w-64" priority />
        ) : (
          <Image src={logo2} alt="logo2" className="w-10" priority />
        )}

        {mobile && (
          <button onClick={onClose} className="lg:hidden p-2">
            <Logout02Svg className="rotate-180" />
          </button>
        )}
      </div>

      <div
        className={cn(
          "flex-1 text-lg font-medium text-[#4F586D] space-y-2.5 overflow-y-auto custom_scroll",
          isCollapsed ? "px-3" : "px-6 lg:px-11",
        )}
      >
        {sidebar_menu?.map((item, index) => (
          <div key={index}>
            <Link
              href={item?.path}
              onClick={mobile ? onClose : undefined}
              className={cn(
                "flex items-center gap-2 py-3 px-4 rounded-lg w-full relative transition-all duration-200",
                `after:absolute after:top-1/2 after:scale-y-0 after:transition-transform after:-translate-y-1/2 z-50 after:h-[75%] after:w-1  ${isCollapsed ? "after:bg-transparent" : "after:bg-secondary"}`,
                isCollapsed
                  ? "justify-center px-0 after:-left-1"
                  : "after:-left-7",
                pathname === item?.path
                  ? "bg-secondary text-white after:scale-y-100"
                  : "hover:bg-gray-50/80 transition-colors",
              )}
              title={isCollapsed ? item.name : ""}
            >
              <span className={cn("shrink-0", isCollapsed && "scale-110")}>
                {item?.icon}
              </span>
              {!isCollapsed && <span className="truncate">{item?.name}</span>}
            </Link>
          </div>
        ))}

        {!isCollapsed && (
          <Image src={slack} alt="slack" className="w-32 mt-4" />
        )}
      </div>

      {/* logout */}
      <div
        className={cn(
          "mt-4",
          isCollapsed ? "px-3 flex justify-center" : "px-6 lg:px-11",
        )}
      >
        <LogoutModal isCollapsed={isCollapsed} />
      </div>
    </div>
  );
}
