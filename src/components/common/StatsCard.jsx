import { Users } from "lucide-react";
import React from "react";

export default function StatsCard({ item }) {
  return (
    <div className="w-full bg-white rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-medium text-[#798090]">
          {item?.name ?? "New Leads"}
        </h5>
        <div
          style={{ backgroundColor: item?.bg, color: item?.color }}
          className="bg-[#EFF6FF] size-12 rounded-lg overflow-hidden text-[#3853FF] flex items-center justify-center"
        >
          <span>{item?.icon ?? <Users />}</span>
        </div>
      </div>
      <h5 className="text-3xl font-semibold">{item?.value ?? 0}</h5>
    </div>
  );
}
