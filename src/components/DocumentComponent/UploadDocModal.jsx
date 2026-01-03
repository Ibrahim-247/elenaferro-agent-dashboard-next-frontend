"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CloudUpload, FileUp, X } from "lucide-react";
import { useRef, useState } from "react";

export default function UploadDocModal() {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);

  const handleFiles = (fileList) => {
    if (!fileList) return;
    const selectedFiles = Array.from(fileList);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };
  return (
    <div>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button className="h-12 bg-secondary text-white hover:bg-secondary/90 px-5!">
              <FileUp className="size-5" /> Upload Documents
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-150! p-8 [&>button]:hidden">
            <DialogClose asChild>
              <div
                type="button"
                className="absolute right-4 top-4 size-8 flex items-center justify-center rounded-full border text-muted-foreground hover:bg-gray-100 hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </div>
            </DialogClose>
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold text-secondary font-cormorant">
                Create New Folder
              </DialogTitle>
              <p className="text-sm font-normal">
                Select a file to upload to your document library.
              </p>
            </DialogHeader>

            <div className="grid gap-2">
              <label className="text-[#404A60]">Select Folder</label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select folder" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* upload file */}
            <div className="space-y-4">
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`h-75 rounded-2xl border-2 border-dashed transition
          ${
            isDragging
              ? "border-secondary bg-secondary/5"
              : "border-[#DFE0E4] bg-[#FFFEFA]"
          }`}
              >
                <div className="flex flex-col items-center justify-center gap-3 h-full">
                  <CloudUpload className="size-8 text-muted-foreground" />

                  <h4 className="text-xl font-semibold">
                    {isDragging ? "Uploading" : "Drag and drop files here"}
                  </h4>

                  <Button
                    type="button"
                    className="bg-secondary text-white hover:bg-secondary/90"
                    onClick={() => inputRef.current?.click()}
                  >
                    Browse File
                  </Button>

                  <input
                    ref={inputRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFiles(e.target.files)}
                  />
                </div>
              </div>

              {/* FILE LIST PREVIEW */}
              {files.length > 0 && (
                <div className="space-y-2">
                  <h5 className="text-sm font-medium">Uploaded Files</h5>
                  <ul className="space-y-1">
                    {files.map((file, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center text-sm border rounded-md px-3 py-2"
                      >
                        <span className="truncate">{file.name}</span>
                        <span className="text-muted-foreground text-xs">
                          {(file.size / 1024).toFixed(1)} KB
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="w-full shrink h-10">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="bg-secondary text-white hover:bg-secondary/90 w-full shrink h-10"
              >
                Upload Document
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}
