"use client";
import { FileText, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";

export default function DocumentDetails() {
  const [search, setSearch] = useState("");
  return (
    <div className="space-y-7">
      <div className="relative w-full">
        <Input
          placeholder="Search name, email or phone"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-12 pl-12 bg-white"
        />
        <Search className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-500" />
      </div>

      <h3 className="text-xl font-semibold">Personal Documents</h3>
      <div className="space-y-3.5 mt-4 h-[calc(100vh-275px)] overflow-auto pr-4">
        {[...Array(20)].map((_, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-xl flex items-center gap-4"
          >
            <div className="size-14 rounded-full overflow-hidden bg-[#EAEEFF] text-[#002BFF] flex items-center justify-center">
              <FileText />
            </div>
            <div>
              <h5 className="text-lg font-medium">
                Listing Agreement - Pine Avenue
              </h5>
              <p className="text-sm font-normal">2 hours ago</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
