"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { X, FileText, Trash2, Inbox } from "lucide-react";
import { useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import {
  useDocumentLinked,
  useDocumentLinkedlist,
  useDocumentUnlinkedlist,
} from "@/hooks/transaction.api";
import { Spinner } from "../ui/spinner";

export default function LinkDocModal({ open, onOpenChange, data }) {
  const [mode, setMode] = useState("linked");
  const [selected, setSelected] = useState([]);

  // document linked
  const linkedMutation = useDocumentLinked(data?.id);

  // unlinked document list
  const { data: unlinkedDocument } = useDocumentUnlinkedlist(data?.id);
  const unlinkedDocumentList = unlinkedDocument?.data;

  // linked document list
  const { data: linkedDocument } = useDocumentLinkedlist(data?.id);
  const linkedDocumentList = linkedDocument?.data;

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <span className="text-blue-600 font-medium cursor-pointer flex items-center gap-1">
          <FileText className="size-4" /> {data?.total_document}
        </span>
      </DialogTrigger>
      <DialogContent className="max-w-2xl rounded-xl p-6 [&>button]:[&_svg]:hidden">
        {/* Header */}
        <DialogHeader className="flex flex-row items-start justify-between">
          <div>
            <DialogTitle className="text-2xl font-cormorant text-secondary">
              Linked Documents
            </DialogTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Transaction {data?.transaction_id} – {data?.property_address}
            </p>
          </div>
          <DialogClose>
            <button
              onClick={() => onOpenChange(false)}
              className="rounded-full border p-2 hover:bg-muted"
            >
              <X className="size-4" />
            </button>
          </DialogClose>
        </DialogHeader>

        {/* Tabs */}
        <div className="flex bg-muted rounded-lg p-1 mt-4">
          <button
            onClick={() => setMode("linked")}
            className={`flex-1 py-2 rounded-md text-sm font-medium ${
              mode === "linked"
                ? "bg-[#9C9486] text-white"
                : "text-muted-foreground"
            }`}
          >
            Linked Docs ({linkedDocumentList?.length})
          </button>
          <button
            onClick={() => setMode("add")}
            className={`flex-1 py-2 rounded-md text-sm font-medium ${
              mode === "add"
                ? "bg-[#9C9486] text-white"
                : "text-muted-foreground"
            }`}
          >
            Add from Documents
          </button>
        </div>

        {/* Content */}
        <div className="mt-6 space-y-4 max-h-75 overflow-auto">
          {mode === "add" ? (
            unlinkedDocumentList?.length > 0 ? (
              unlinkedDocumentList?.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between border-b pb-3"
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={selected.includes(doc.id)}
                      onCheckedChange={() => toggleSelect(doc.id)}
                    />

                    <div className="size-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <FileText className="text-blue-600 size-5" />
                    </div>

                    <div>
                      <p className="font-medium">{doc.document_folder_name}</p>
                      <p className="text-xs text-muted-foreground">
                        PDF · {doc.last_updated_human}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-10 text-center text-base">
                <div className="flex flex-col items-center justify-center gap-2">
                  <Inbox className="text-gray-400 size-13" /> No data found
                </div>
              </div>
            )
          ) : linkedDocumentList?.length > 0 ? (
            linkedDocumentList?.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between border-b pb-3"
              >
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <FileText className="text-blue-600 size-5" />
                  </div>

                  <div>
                    <p className="font-medium">{doc.document_folder_name}</p>
                    <p className="text-xs text-muted-foreground">
                      PDF · {doc.last_updated_human}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={doc?.file}
                    target="_blank"
                    title={doc?.document_folder_name}
                  >
                    <Button
                      size="sm"
                      className="rounded-full bg-[#8BC7FF33] text-[#4A72F5] hover:bg-[#4A72F5]/20"
                    >
                      View
                    </Button>
                  </a>

                  <Trash2 className="text-red-500 cursor-pointer size-4" />
                </div>
              </div>
            ))
          ) : (
            <div className="py-10 text-center text-base">
              <div className="flex flex-col items-center justify-center gap-2">
                <Inbox className="text-gray-400 size-13" /> No data found
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {mode === "add" && (
          <Button
            onClick={() => linkedMutation?.mutate({ document_ids: selected })}
            disabled={selected.length === 0 || linkedMutation?.isPending}
            className="w-full mt-6 bg-[#9C9486] hover:bg-[#8a8274]"
          >
            {linkedMutation?.isPending && <Spinner />} Link to Documents
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
