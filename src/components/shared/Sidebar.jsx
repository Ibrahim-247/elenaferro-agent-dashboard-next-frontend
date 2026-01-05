"use client";
import Image from "next/image";
import logo from "../../assets/logo.png";
import {
  ArrowRightLeft,
  FileText,
  Folder,
  LayoutDashboard,
  Settings,
  TrendingUp,
  Users,
  Video,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
export default function Sidebar() {
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
    { name: "Settings", path: "", icon: <Settings /> },
  ];
  return (
    <div className="max-w-88 w-full pr-0 pt-3 pb-6">
      <Image src={logo} alt="logo" className="w-64 ml-11" />
      <div className="text-lg font-medium text-[#4F586D] mt-8 space-y-2.5 h-[calc(100vh-150px)] overflow-auto pr-11 custom_scroll">
        {sidebar_menu?.map((item, index) => (
          <div className="ml-11" key={index}>
            <Link
              href={item?.path}
              key={index}
              className={`flex items-center gap-2 py-3 px-4 rounded-lg w-full  relative after:absolute after:top-1/2 after:scale-y-0 after:transition-transform after:-translate-y-1/2 after:-left-7 z-50 after:h-[75%] after:w-1 after:bg-secondary ${
                pathname === item?.path &&
                "bg-secondary text-white after:scale-y-100"
              }`}
            >
              <span>{item?.icon}</span>
              <span>{item?.name}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
