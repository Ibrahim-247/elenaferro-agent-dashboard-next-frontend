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
import { Input } from "@/components/ui/input";
import useApiMutation from "@/hooks/useApiMutation";
import { FolderPlus, X } from "lucide-react";
import { useState } from "react";
import { Spinner } from "../ui/spinner";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function CreateFolderModal() {
  const [folderName, setfolderName] = useState();
  const queryClient = useQueryClient();
  const [open, setopen] = useState();

  // folder create api call
  const folderCreate = useApiMutation({
    key: "folder_create",
    isPrivate: true,
    endpoint: "/agent/document_folder/create",
    onSuccess: () => {
      queryClient?.invalidateQueries(["folder_list"]);
      toast.success("Folder created successfully");
      setopen(false);
      setfolderName("");
    },
    onError: (error) => {
      console.error("My folder create", error);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setopen}>
      <form className="w-full">
        <DialogTrigger asChild className="w-full">
          <Button className="h-12 bg-secondary w-full md:w-auto text-white hover:bg-secondary/90 px-5!">
            <FolderPlus className="size-5" /> Create New Folder
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
          </DialogHeader>

          <div className="grid gap-2">
            <label className="text-[#404A60]">Folder Name</label>
            <Input
              name="name"
              value={folderName}
              placeholder="Enter Folder Name"
              onChange={(e) => setfolderName(e.target.value)}
              className="h-10"
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                disabled={folderCreate?.isPending}
                onClick={() => setopen(false)}
                variant="outline"
                className="w-full shrink h-10"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={() => folderCreate?.mutate({ name: folderName })}
              type="submit"
              disabled={folderCreate?.isPending}
              className="bg-secondary text-white hover:bg-secondary/90 w-full shrink h-10"
            >
              {folderCreate?.isPending && <Spinner />} Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
