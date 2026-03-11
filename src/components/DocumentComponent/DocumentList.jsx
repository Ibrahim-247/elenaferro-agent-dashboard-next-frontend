"use client";
import DocumentHeader from "./DocumentHeader";
import FolderCard from "./FolderCard";
import CreateFolderModal from "./CreateFolderModal";
import UploadDocModal from "./UploadDocModal";
import { useFolderlist } from "@/hooks/document.api";
import { useMemo, useState } from "react";
import { Inbox } from "lucide-react";

export default function DocumentList() {
  const [search, setSearch] = useState("");

  // folder list
  const { data, isPending } = useFolderlist();
  const folder = data?.data;

  // filter logic
  const filteredData = useMemo(() => {
    return folder?.filter((lead) => {
      const matchSearch = lead?.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      return matchSearch;
    });
  }, [search, folder]);

  return (
    <div className="space-y-12">
      <DocumentHeader setSearch={setSearch} search={search} />
      <div className="flex items-center flex-wrap justify-between gap-y-3">
        <h3 className="text-2xl lg:text-3xl font-semibold">All Documents</h3>
        <div className="flex items-center gap-5 flex-col md:flex-row w-full md:w-auto">
          <CreateFolderModal />
          <UploadDocModal />
        </div>
      </div>
      <div className="grid lg:grid-cols-4 gap-8">
        {isPending ? (
          [...Array(8)]?.map((_, index) => (
            <div
              key={index}
              className="w-full bg-white border border-gray-100 rounded-2xl p-6 shadow-xs animate-pulse space-y-5"
            >
              <div className="size-14 rounded-xl bg-gray-200"></div>
              <div className="space-y-3">
                <div className="w-3/4 h-6 bg-gray-200 rounded-md"></div>
                <div className="w-1/2 h-4 bg-gray-100 rounded-md"></div>
              </div>
            </div>
          ))
        ) : filteredData?.length > 0 ? (
          filteredData?.map((item, index) => (
            <FolderCard key={index} item={item} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 col-span-12 py-20">
            <span>No data found</span>
            <Inbox className="size-15 text-gray-500" />
          </div>
        )}
      </div>
    </div>
  );
}
