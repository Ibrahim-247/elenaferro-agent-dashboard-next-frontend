import Link from "next/link";
import { MoreVertical, Pencil, Trash2, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import EditFolderModal from "./EditFolderModal";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeleteFolder } from "@/hooks/document.api";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import FolderSvg from "../svg/FolderSvg";

export default function FolderCard({ item }) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const queryClient = useQueryClient();

  const folderDelete = useDeleteFolder(item?.id);

  const handleDelete = () => {
    folderDelete.mutate(null, {
      onSuccess: () => {
        queryClient.invalidateQueries(["folder_list"]);
        toast.success("Folder deleted successfully");
        setDeleteOpen(false);
      },
      onError: (error) => {
        const errorMessage =
          error?.response?.data?.message || "Something went wrong";
        toast.error(errorMessage);
      },
    });
  };

  return (
    <div className="w-full relative group z-20 overflow-hidden rounded-2xl">
      <div className="absolute top-4 right-4 z-50">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors outline-none">
              <MoreVertical className="size-5 text-gray-500" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem
              onClick={() => setEditOpen(true)}
              className="cursor-pointer"
            >
              <Pencil className="mr-2 size-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setDeleteOpen(true)}
              className="cursor-pointer text-destructive focus:text-destructive"
            >
              <Trash2 className="mr-2 size-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Link
        href={`/documents/${item?.id}`}
        className="block bg-white border border-gray-100 rounded-2xl p-6 shadow-xs overflow-hidden hover:shadow-xl hover:border-secondary/20 hover:-translate-y-1 transition-all duration-300 h-full"
      >
        <div className="flex flex-col gap-5">
          {/* Icon Container */}
          <div className="size-14 rounded-xl bg-secondary/5 flex items-center justify-center group-hover:bg-secondary/10 transition-colors">
            <FolderSvg className="size-8 text-secondary" />
          </div>

          <div className="space-y-1.5">
            <h4 className="text-xl font-bold text-[#1D1235] truncate leading-tight">
              {item?.name}
            </h4>
            <div className="flex items-center gap-2 text-sm text-[#798090] font-medium">
              <span>{item?.total_documents ?? 0} files</span>
              <span className="size-1 rounded-full bg-gray-300" />
              <span>{item?.total_document_file_sizes ?? "0 KB"}</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Modals */}
      <EditFolderModal open={editOpen} setOpen={setEditOpen} folder={item} />

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="max-w-md p-8 [&>button]:hidden">
          <DialogClose asChild>
            <div className="absolute right-4 top-4 size-8 flex items-center justify-center rounded-full border text-muted-foreground hover:bg-gray-100 hover:text-foreground cursor-pointer">
              <X className="h-5 w-5" />
            </div>
          </DialogClose>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-secondary font-cormorant">
              Delete Folder
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-[#404A60]">
              Are you sure you want to delete the folder{" "}
              <span className="font-semibold">"{item?.name}"</span>? This action
              cannot be undone.
            </p>
          </div>
          <DialogFooter className="gap-2">
            <Button
              disabled={folderDelete.isPending}
              onClick={() => setDeleteOpen(false)}
              variant="outline"
              className="w-full h-10 shrink"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              disabled={folderDelete.isPending}
              variant="destructive"
              className="w-full h-10 bg-red-600 hover:bg-red-700 text-white shrink"
            >
              {folderDelete.isPending && <Spinner />} Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
