"use client";
import { Download, FileText, Inbox, SquarePen } from "lucide-react";
import PublicFolderHeader from "./PublicFolderHeader";
import { Button } from "../ui/button";
import { useResourceslist } from "@/hooks/resources.api";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function PublicFolders() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("all");

  // resources list
  const { data, isPending } = useResourceslist();
  const resources = data?.data?.data;

  const filteredData = useMemo(() => {
    return resources?.map((item) => ({
      ...item,
      items: item?.items?.filter((i) => {
        const matchSearch =
          i?.name?.toLowerCase().includes(search.toLowerCase()) ||
          i?.type?.toLowerCase().includes(search.toLowerCase()) ||
          i?.phone?.includes(search);

        const matchType = type === "all" || type === "" || i?.category === type;

        return matchSearch && matchType;
      }),
    }));
  }, [resources, search, type, data]);

  return (
    <div className="space-y-5">
      <PublicFolderHeader
        setSearch={setSearch}
        search={search}
        setType={setType}
        type={type}
      />
      <div className="bg-white p-6 rounded-xl space-y-5">
        <h3 className="text-xl font-semibold">All Resources</h3>
        <div className="space-y-3.5 mt-4 h-[calc(100vh-540px)] overflow-auto pr-4">
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
            filteredData?.map((item, index) => {
              return (
                item?.items?.length > 0 && (
                  <div key={index} className="space-y-3">
                    <h5 className="text-xl font-semibold capitalize">
                      {item?.category}
                    </h5>
                    <div className="space-y-3.5">
                      {item?.items?.map((resource, idx) => (
                        <div
                          key={idx}
                          className="bg-gray-100 p-4 rounded-xl flex items-center gap-4 justify-between"
                        >
                          <div className="flex items-center gap-4">
                            <div className="size-14 rounded-full overflow-hidden bg-[#EDDAFF] text-[#A633FA] flex items-center justify-center">
                              <FileText />
                            </div>
                            <div>
                              <h5 className="text-lg font-medium">
                                {resource?.name}
                              </h5>
                              <p className="text-sm font-normal">
                                {resource?.uploaded_at}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {resource?.type !== "image" && (
                              <Link href={resource?.file} target="_blank">
                                <Button className="bg-secondary text-white hover:bg-secondary/90 text-xs h-7 px-2!">
                                  <SquarePen />
                                  Edit
                                </Button>
                              </Link>
                            )}

                            {resource?.type === "image" && (
                              <Button
                                onClick={async () => {
                                  try {
                                    const response = await fetch(
                                      resource?.file,
                                    );
                                    const blob = await response.blob();
                                    const url =
                                      window.URL.createObjectURL(blob);
                                    const link = document.createElement("a");
                                    link.href = url;
                                    link.download = resource?.name;
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                    window.URL.revokeObjectURL(url);
                                  } catch (error) {
                                    console.error(
                                      "Image download failed",
                                      error,
                                    );
                                  }
                                }}
                                className="bg-secondary text-white hover:bg-secondary/90 text-xs h-7 px-2!"
                              >
                                <Download />
                                Download
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              );
            })
          ) : (
            <div className="h-full text-center text-base flex items-center justify-center">
              <div className="flex flex-col items-center justify-center gap-2">
                <Inbox className="text-gray-400 size-13" /> No data found
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
