"use client";
import { usePortallist } from "@/hooks/portal.api";
import PortalCard from "./PortalCard";
import TrainingPortalHeader from "./TrainingPortalHeader";
import { useMemo, useState } from "react";
import { Inbox } from "lucide-react";

export default function TrainingPortals() {
  const [search, setSearch] = useState("");

  // training portal
  const { data, isPending } = usePortallist();
  const portal = data?.data?.data;

  // filter logic
  const filteredData = useMemo(() => {
    return portal?.filter((lead) => {
      const matchSearch = lead?.title
        ?.toLowerCase()
        .includes(search.toLowerCase());
      return matchSearch;
    });
  }, [search, portal]);

  return (
    <div className="space-y-6">
      {portal?.length > 0 && (
        <TrainingPortalHeader setSearch={setSearch} search={search} />
      )}

      <div className="grid grid-cols-5 gap-7">
        {isPending ? (
          [...Array(5)]?.map((_, index) => (
            <div
              key={index}
              className="w-full bg-white min-w-68 rounded-xl overflow-hidden animate-pulse"
            >
              <div className="bg-gray-200 w-full h-51 relative flex items-center justify-center">
                <div className="size-10 rounded-full bg-gray-300" />
              </div>
              <div className="p-3 space-y-4">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                </div>
                <div className="h-10 w-full bg-gray-200 rounded-md" />
              </div>
            </div>
          ))
        ) : filteredData?.length > 0 ? (
          filteredData?.map((item, index) => (
            <PortalCard key={index} item={item} />
          ))
        ) : (
          <div className="py-10 text-center text-base w-full col-span-12 ">
            <div className="flex flex-col items-center justify-center gap-2">
              <Inbox className="text-gray-400 size-13" /> No data found
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
