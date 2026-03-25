"use client";
import {
  Download,
  FileText,
  Inbox,
  SquarePen,
  X,
  ChevronRight,
} from "lucide-react";
import PublicFolderHeader from "./PublicFolderHeader";
import { Button } from "../ui/button";
import { useResourceslist } from "@/hooks/resources.api";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import FolderSvg from "../svg/FolderSvg";

export default function PublicFolders() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  // resources list
  const { data, isPending } = useResourceslist();
  const resources = data?.data?.data;

  const filteredData = useMemo(() => {
    return resources?.map((item) => ({
      ...item,
      items: item?.items?.filter((i) => {
        const matchSearch =
          i?.name?.toLowerCase().includes(search.toLowerCase()) ||
          i?.type?.toLowerCase().includes(search.toLowerCase());

        const matchType = type === "all" || type === "" || i?.type === type;

        return matchSearch && matchType;
      }),
    }));
  }, [resources, search, type]);

  const handleDownload = async (resource) => {
    try {
      const response = await fetch(resource?.file);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = resource?.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed", error);
    }
  };

  const ResourceItem = ({ resource }) => (
    <div className="bg-gray-100 p-4 rounded-xl flex items-center flex-wrap gap-4 justify-between">
      <div className="flex items-center gap-4">
        <div className="size-14 shrink-0 rounded-full overflow-hidden bg-[#EDDAFF] text-[#A633FA] flex items-center justify-center">
          <FileText />
        </div>
        <div>
          <h5 className="text-lg font-medium line-clamp-1">{resource?.name}</h5>
          <p className="text-sm font-normal">{resource?.uploaded_at}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {resource?.type !== "image" ? (
          <Link href={resource?.file} target="_blank">
            <Button className="bg-secondary text-white hover:bg-secondary/90 text-xs h-7 px-4">
              <SquarePen className="size-4" />
              Edit
            </Button>
          </Link>
        ) : (
          <Button
            onClick={() => handleDownload(resource)}
            className="bg-secondary text-white hover:bg-secondary/90 text-xs h-7 px-4"
          >
            <Download className="size-4" />
            Download
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-5">
      <PublicFolderHeader
        setSearch={setSearch}
        search={search}
        setType={setType}
        type={type}
      />
      <div className="bg-white p-4 md:p-6 rounded-2xl space-y-5 border border-gray-50">
        <h3 className="text-xl font-bold text-[#1D1235]">All Resources</h3>

        {/* Mobile Category Cards View */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {isPending ? (
            [...Array(4)].map((_, index) => (
              <div
                key={index}
                className="h-20 bg-gray-50 animate-pulse rounded-2xl"
              />
            ))
          ) : filteredData?.length > 0 ? (
            filteredData.map(
              (category, index) =>
                category.items?.length > 0 && (
                  <button
                    key={index}
                    onClick={() => setSelectedCategory(category)}
                    className="bg-gray-50 border border-gray-100 p-5 rounded-2xl flex items-center justify-between group active:scale-[0.98] transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                        <FolderSvg className="size-7 text-secondary" />
                      </div>
                      <div className="text-left">
                        <h5 className="text-lg font-bold text-[#1D1235] capitalize">
                          {category?.category_name?.replace(/_/g, " ")}
                        </h5>
                        <p className="text-sm text-[#798090]">
                          {category?.items?.length}{" "}
                          {category?.items?.length === 1
                            ? "Resource"
                            : "Resources"}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="text-gray-400 group-hover:text-secondary transition-colors" />
                  </button>
                ),
            )
          ) : (
            <div className="py-20 flex flex-col items-center justify-center gap-2 text-[#798090]">
              <Inbox className="size-12 opacity-20" />
              <p>No resources found</p>
            </div>
          )}
        </div>

        {/* Desktop List View */}
        <div className="hidden md:block space-y-8 mt-4 h-[calc(100vh-354px)] overflow-auto pr-4 custom-scrollbar">
          {isPending ? (
            [...Array(4)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-50 p-4 rounded-xl flex items-center gap-4 animate-pulse"
              >
                <div className="size-14 rounded-full bg-gray-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 w-1/2 bg-gray-200 rounded-md" />
                  <div className="h-4 w-1/3 bg-gray-200 rounded-md" />
                </div>
              </div>
            ))
          ) : filteredData?.length > 0 ? (
            filteredData?.map((item, index) =>
              item?.items?.length > 0 ? (
                <div key={index} className="space-y-4">
                  <h5 className="text-xl font-bold text-[#1D1235] capitalize flex items-center gap-2">
                    <div className="w-1 h-6 bg-secondary rounded-full" />
                    {item?.category_name}
                  </h5>
                  <div className="grid grid-cols-1 gap-3.5">
                    {item?.items?.map((resource, idx) => (
                      <ResourceItem key={idx} resource={resource} />
                    ))}
                  </div>
                </div>
              ) : (
                <div
                  key={index}
                  className="h-full flex flex-col items-center justify-center gap-3 text-[#798090] py-20"
                >
                  <Inbox className="size-15 opacity-20" />
                  <p className="text-lg font-medium">
                    No results found for your search
                  </p>
                </div>
              ),
            )
          ) : (
            <div className="h-full flex flex-col items-center justify-center gap-3 text-[#798090] py-20">
              <Inbox className="size-15 opacity-20" />
              <p className="text-lg font-medium">
                No results found for your search
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Resources Modal */}
      <Dialog
        open={!!selectedCategory}
        onOpenChange={(open) => !open && setSelectedCategory(null)}
      >
        <DialogContent className="max-w-md w-[95%] max-h-[95vh] rounded-3xl p-0  overflow-hidden [&>button]:hidden border-none shadow-2xl">
          <div className="bg-secondary p-8 flex flex-col items-center justify-center text-white relative">
            <button
              onClick={() => setSelectedCategory(null)}
              className="absolute top-5 right-5 p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="size-6" />
            </button>
            <div className="size-20 rounded-2xl text-white bg-white/10 flex items-center justify-center mb-4 backdrop-blur-sm">
              <FolderSvg className="size-10" />
            </div>
            <h3 className="text-2xl font-bold text-center capitalize">
              {selectedCategory?.category_name?.replace(/_/g, " ")}
            </h3>
            <p className="text-white/70 text-sm mt-1">
              {selectedCategory?.items?.length} items available
            </p>
          </div>

          <div className="p-5 max-h-[60vh] overflow-auto space-y-3 custom-scrollbar">
            {selectedCategory?.items?.map((resource, idx) => (
              <ResourceItem key={idx} resource={resource} />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
