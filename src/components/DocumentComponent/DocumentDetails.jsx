"use client";
import { FileText, Inbox, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Input } from "../ui/input";
import { useDocumentDetails } from "@/hooks/document.api";

export default function DocumentDetails({ id }) {
  const [search, setSearch] = useState("");

  // document details data hooks
  const { data, isPending } = useDocumentDetails(id);
  const details = data?.data;

  // filter logic
  const filteredData = useMemo(() => {
    return details?.filter((lead) => {
      const matchSearch = lead?.document_folder_name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      return matchSearch;
    });
  }, [search, details]);

  return (
    <div className="space-y-7">
      {details?.length > 0 && (
        <div className="relative w-full">
          <Input
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-12 pl-12 bg-white"
          />
          <Search className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-500" />
        </div>
      )}

      <h3 className="text-xl font-semibold">Personal Documents</h3>
      <div className="space-y-3.5 mt-4 h-[calc(100vh-275px)] overflow-auto pr-4">
        {isPending ? (
          [...Array(4)].map((_, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-xl flex items-center gap-4 animate-pulse"
            >
              <div className="size-14 rounded-full bg-gray-200" />
              <div className="flex-1 space-y-2">
                <div className="h-5 w-1/2 bg-gray-200 rounded-md" />
                <div className="h-4 w-1/3 bg-gray-200 rounded-md" />
              </div>
            </div>
          ))
        ) : filteredData?.length > 0 ? (
          filteredData?.map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-xl flex items-center gap-4"
            >
              <div className="size-14 rounded-full overflow-hidden bg-[#EAEEFF] text-[#002BFF] flex items-center justify-center">
                <FileText />
              </div>
              <div>
                <h5 className="text-lg font-medium">
                  {item?.document_folder_name}
                </h5>
                <p className="text-sm font-normal">
                  {item?.last_updated_human}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col h-full items-center justify-center col-span-12 gap-3">
            <span>No data found</span>
            <Inbox className="size-16 text-gray-500" />
          </div>
        )}
      </div>
    </div>
  );
}
