import { FileText } from "lucide-react";
import React from "react";

export default function RecentActivity() {
  return (
    <div className="bg-white p-8 pr-0 rounded-2xl">
      <h4 className="text-3xl font-semibold">Recent Activity</h4>
      <div className="max-h-120 overflow-auto h-full space-y-2 mt-8 pr-8 custom_scroll">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="flex items-center gap-4 pb-5 border-b">
            <div className="bg-[#FAF5FF] text-[#A633FA] size-12 rounded-lg flex items-center justify-center">
              <FileText />
            </div>
            <div className="space-y-1">
              <h4 className="text-xl font-medium">
                You uploaded Purchase_Agreement.pdf
              </h4>
              <p className="text-sm font-normal">2 hours ago</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
