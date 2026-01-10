"use client";
import { Download, FileText, SquarePen } from "lucide-react";
import PublicFolderHeader from "./PublicFolderHeader";
import { Button } from "../ui/button";
import { useResourceslist } from "@/hooks/resources.api";

export default function PublicFolders() {
  // resources list
  const { data } = useResourceslist();
  const resources = data?.data?.data;
  console.log(resources);

  return (
    <div className="space-y-5">
      <PublicFolderHeader />
      <div className="bg-white p-6 rounded-xl space-y-5">
        <h3 className="text-xl font-semibold">All Resources</h3>
        <div className="space-y-3.5 mt-4 h-[calc(100vh-540px)] overflow-auto pr-4">
          {[...Array(20)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-100 p-4 rounded-xl flex items-center gap-4 justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="size-14 rounded-full overflow-hidden bg-[#EDDAFF] text-[#A633FA] flex items-center justify-center">
                  <FileText />
                </div>
                <div>
                  <h5 className="text-lg font-medium">
                    Listing Agreement - Pine Avenue
                  </h5>
                  <p className="text-sm font-normal">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button className="bg-secondary text-white hover:bg-secondary/90 text-xs h-7 px-2!">
                  <SquarePen />
                  Edit
                </Button>
                <Button className="bg-secondary text-white hover:bg-secondary/90 text-xs h-7 px-2!">
                  <Download />
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
