"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUpdateFolder } from "@/hooks/document.api";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { Spinner } from "../ui/spinner";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function EditFolderModal({ open, setOpen, folder }) {
  const [folderName, setFolderName] = useState(folder?.name || "");
  const queryClient = useQueryClient();

  useEffect(() => {
    if (folder) {
      setFolderName(folder.name);
    }
  }, [folder]);

  const folderUpdate = useUpdateFolder(folder?.id);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!folderName.trim()) {
      toast.error("Folder name cannot be empty");
      return;
    }

    folderUpdate.mutate(
      { name: folderName },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["folder_list"]);
          toast.success("Folder updated successfully");
          setOpen(false);
        },
        onError: (error) => {
          const errorMessage =
            error?.response?.data?.message || "Something went wrong";
          toast.error(errorMessage);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-150! p-8 [&>button]:hidden">
        <DialogClose asChild>
          <div
            type="button"
            className="absolute right-4 top-4 size-8 flex items-center justify-center rounded-full border text-muted-foreground hover:bg-gray-100 hover:text-foreground cursor-pointer"
          >
            <X className="h-5 w-5" />
          </div>
        </DialogClose>
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-secondary font-cormorant">
            Edit Folder
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="grid gap-2">
            <label className="text-[#404A60]">Folder Name</label>
            <Input
              name="name"
              value={folderName}
              placeholder="Enter Folder Name"
              onChange={(e) => setFolderName(e.target.value)}
              className="h-10"
            />
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              disabled={folderUpdate.isPending}
              onClick={() => setOpen(false)}
              variant="outline"
              className="w-full shrink h-10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={folderUpdate.isPending}
              className="bg-secondary text-white hover:bg-secondary/90 w-full shrink h-10"
            >
              {folderUpdate.isPending && <Spinner />} Update
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
