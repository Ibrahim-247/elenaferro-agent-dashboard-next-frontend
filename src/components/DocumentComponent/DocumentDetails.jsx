"use client";
import {
  FileText,
  Inbox,
  InfoIcon,
  Search,
  SendHorizontal,
  MoreVertical,
  Pencil,
  Trash2,
  Eye,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Input } from "../ui/input";
import {
  useDocumentDetails,
  useUpdateDocument,
  useDeleteDocument,
} from "@/hooks/document.api";
import { Alert, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import { useConnectDocusign, useDocusignStatus } from "@/hooks/docusign.api";
import { Spinner } from "../ui/spinner";
import SendSignatureModal from "./SendSignatureModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function DocumentDetails({ id }) {
  const [search, setSearch] = useState("");
  const [renameData, setRenameData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const queryClient = useQueryClient();

  // connect docusign
  const docusignConnect = useConnectDocusign();

  // docusign status
  const { data: docusignStatus } = useDocusignStatus();
  const connected = docusignStatus?.data?.is_connected;

  // document details data hooks
  const { data, isPending } = useDocumentDetails(id);
  const details = data?.data;

  // rename mutation
  const renameMutation = useUpdateDocument(renameData?.id);
  // delete mutation
  const deleteMutation = useDeleteDocument(deleteId);

  const handleRename = () => {
    if (!renameData?.name) return;
    renameMutation?.mutate(
      { file_name: renameData.name },
      {
        onSuccess: () => {
          setRenameData(null);
          queryClient?.invalidateQueries(["document_details", { id }]);
          toast.success("Document renamed successfully");
        },
      },
    );
  };

  const handleDelete = () => {
    if (!deleteId) return;
    deleteMutation?.mutate(null, {
      onSuccess: () => {
        setDeleteId(null);
        queryClient?.invalidateQueries(["document_details", { id }]);
        toast.success("Document deleted successfully");
      },
    });
  };

  // filter logic
  const filteredData = useMemo(() => {
    return details?.filter((lead) => {
      const matchSearch = lead?.file_name
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
      {/* docusign connect alert */}
      {!connected && (
        <Alert className="bg-yellow-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <InfoIcon className="size-4 shrink-0" />
            <AlertTitle>
              Please connect your DocuSign account before sending documents for
              e-signature
            </AlertTitle>
          </div>
          <Button
            disabled={docusignConnect?.isPending}
            onClick={() => docusignConnect?.mutate()}
          >
            Connect {docusignConnect?.isPending && <Spinner />}
          </Button>
        </Alert>
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
              className="bg-white p-4 rounded-xl flex items-center gap-4 justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="size-14 rounded-full overflow-hidden bg-[#EAEEFF] text-[#002BFF] flex items-center justify-center">
                  <FileText />
                </div>
                <div>
                  <h5 className="text-lg font-medium">{item?.file_name}</h5>
                  <p className="text-sm font-normal">
                    {item?.last_updated_human}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <SendSignatureModal
                  documents={details}
                  id={item?.id}
                  connected={connected}
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="size-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-50">
                      <MoreVertical className="size-5" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem
                      onClick={() => window.open(item?.file, "_blank")}
                      className="gap-2"
                    >
                      <Eye className="size-4" /> View
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        setRenameData({ id: item.id, name: item.file_name })
                      }
                      className="gap-2"
                    >
                      <Pencil className="size-4" /> Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setDeleteId(item.id)}
                      className="gap-2 text-red-500 focus:text-red-500"
                    >
                      <Trash2 className="size-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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

      {/* rename modal */}
      <Dialog open={!!renameData} onOpenChange={() => setRenameData(null)}>
        <DialogContent className="max-w-md p-8 [&>button]:hidden">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-secondary font-cormorant">
              Rename Document
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <Input
              value={renameData?.name || ""}
              onChange={(e) =>
                setRenameData({ ...renameData, name: e.target.value })
              }
              placeholder="Enter new name"
              className="h-12"
            />
          </div>
          <DialogFooter className="mt-8 gap-3">
            <DialogClose asChild>
              <Button variant="outline" className="w-full shrink">
                Cancel
              </Button>
            </DialogClose>
            <Button
              className="w-full bg-secondary shrink"
              disabled={renameMutation.isPending || !renameData?.name}
              onClick={handleRename}
            >
              {renameMutation.isPending && <Spinner />} Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* delete confirmation */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="max-w-md p-8 [&>button]:hidden">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-secondary font-cormorant text-center">
              Are you sure?
            </DialogTitle>
            <p className="text-center text-gray-500">
              This action cannot be undone. This will permanently delete the
              document.
            </p>
          </DialogHeader>
          <DialogFooter className="mt-8 gap-3">
            <DialogClose asChild>
              <Button variant="outline" className="w-full shrink">
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              className="w-full shrink"
              disabled={deleteMutation.isPending}
              onClick={handleDelete}
            >
              {deleteMutation.isPending && <Spinner />} Delete Permanently
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
