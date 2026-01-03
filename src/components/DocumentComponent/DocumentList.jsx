import React from "react";
import DocumentHeader from "./DocumentHeader";
import FolderCard from "./FolderCard";
import { Button } from "../ui/button";
import { FileUp, FolderPlus } from "lucide-react";
import CreateFolderModal from "./CreateFolderModal";
import UploadDocModal from "./UploadDocModal";

export default function DocumentList() {
  return (
    <div className="space-y-12">
      <DocumentHeader />
      <div className="flex items-center justify-between">
        <h3 className="text-3xl font-semibold">All Documents</h3>{" "}
        <div className="flex items-center gap-5">
          <CreateFolderModal />
          <UploadDocModal />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-8">
        {[...Array(6)]?.map((_, index) => (
          <FolderCard key={index} />
        ))}
      </div>
    </div>
  );
}
