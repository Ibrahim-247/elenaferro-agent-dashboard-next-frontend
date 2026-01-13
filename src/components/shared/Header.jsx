"use client";
import { Bell } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <div className="h-23 w-full flex items-center justify-between px-6">
      <h4 className="text-3xl font-semibold">Good Morning, Sarah Mitchell</h4>
      <div className="flex items-center gap-5">
        <div className="size-12 rounded-lg bg-gray-100 border-gray-300 border flex items-center justify-center">
          <Bell />
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-gray-200 rounded-full overflow-hidden size-12"></div>
          <div>
            <h5 className="text-lg font-medium">John Doe</h5>
            <p className="text-sm font-normal">Agent</p>
          </div>
        </div>
      </div>
    </div>
  );
}
