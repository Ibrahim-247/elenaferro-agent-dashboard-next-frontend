"use client";
import Image from "next/image";
import logo from "../../assets/logo.png";
import {
  ArrowRightLeft,
  FileText,
  Folder,
  LayoutDashboard,
  LogOut,
  Settings,
  TrendingUp,
  Users,
  Video,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";
import LogoutModal from "../Authentication/LogoutModal";
export default function Sidebar({ mobile, onClose }) {
  const pathname = usePathname();

  const sidebar_menu = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboard /> },
    { name: "CRM", path: "/crm", icon: <Users /> },
    { name: "Documents", path: "/documents", icon: <FileText /> },
    { name: "Transactions", path: "/transaction", icon: <ArrowRightLeft /> },
    {
      name: "Performance & Tasks",
      path: "/performance_tasks",
      icon: <TrendingUp />,
    },
    { name: "Public Folder", path: "/public_folder", icon: <Folder /> },
    { name: "Training Portal", path: "/training_portal", icon: <Video /> },
    { name: "Settings", path: "/settings", icon: <Settings /> },
  ];
  return (
    <div
      className={`h-full flex flex-col bg-white ${
        mobile ? "w-full" : "max-w-88 w-full"
      } pr-0 pt-3 pb-6 border-r border-gray-100`}
    >
      <div className="flex items-center justify-between px-6 lg:px-11 mb-8">
        <Image src={logo} alt="logo" className="w-48 lg:w-64" />
        {mobile && (
          <button onClick={onClose} className="lg:hidden p-2">
            <LogOut className="rotate-180" />
          </button>
        )}
      </div>
      <div className="flex-1 text-lg font-medium text-[#4F586D] space-y-2.5 overflow-y-auto px-6 lg:px-11 custom_scroll">
        {sidebar_menu?.map((item, index) => (
          <div key={index}>
            <Link
              href={item?.path}
              onClick={mobile ? onClose : undefined}
              className={`flex items-center gap-2 py-3 px-4 rounded-lg w-full relative after:absolute after:top-1/2 after:scale-y-0 after:transition-transform after:-translate-y-1/2 after:-left-7 z-50 after:h-[75%] after:w-1 after:bg-secondary ${
                pathname === item?.path
                  ? "bg-secondary text-white after:scale-y-100"
                  : "hover:bg-gray-50 transition-colors"
              }`}
            >
              <span className="shrink-0">{item?.icon}</span>
              <span className="truncate">{item?.name}</span>
            </Link>
          </div>
        ))}
      </div>
      {/* logout */}
      <div className="px-6 lg:px-11 mt-4">
        <LogoutModal />
      </div>
    </div>
  );
}
