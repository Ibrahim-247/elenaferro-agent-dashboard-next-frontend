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
import { X, FileText, Trash2 } from "lucide-react";
import { useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";

const docs = [
  { id: 1, name: "Purchase_Agreement.pdf", date: "Nov 8, 2025" },
  { id: 2, name: "Purchase_Agreement.pdf", date: "Nov 8, 2025" },
  { id: 3, name: "Purchase_Agreement.pdf", date: "Nov 8, 2025" },
];

export default function LinkDocModal({ open, onOpenChange, getValue }) {
  const [mode, setMode] = useState("linked");
  const [selected, setSelected] = useState([]);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <span className="text-blue-600 font-medium cursor-pointer flex items-center gap-1">
          <FileText className="size-4" /> {getValue()}
        </span>
      </DialogTrigger>
      <DialogContent className="max-w-2xl rounded-xl p-6 [&>button]:hidden">
        {/* Header */}
        <DialogHeader className="flex flex-row items-start justify-between">
          <div>
            <DialogTitle className="text-2xl font-cormorant text-secondary">
              Linked Documents
            </DialogTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Transaction #TRX-1021 – 123 Maple Ave, Atlanta, GA
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
            Linked Docs (3)
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
          {docs.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between border-b pb-3"
            >
              <div className="flex items-center gap-3">
                {mode === "add" && (
                  <Checkbox
                    checked={selected.includes(doc.id)}
                    onCheckedChange={() => toggleSelect(doc.id)}
                  />
                )}

                <div className="size-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <FileText className="text-blue-600 size-5" />
                </div>

                <div>
                  <p className="font-medium">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">
                    PDF · {doc.date}
                  </p>
                </div>
              </div>

              {mode === "linked" && (
                <div className="flex items-center gap-3">
                  <Button
                    size="sm"
                    className="rounded-full bg-[#8BC7FF33] text-[#4A72F5] hover:bg-[#4A72F5]/20"
                  >
                    View
                  </Button>
                  <Trash2 className="text-red-500 cursor-pointer size-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        {mode === "add" && (
          <Button
            disabled={selected.length === 0}
            className="w-full mt-6 bg-[#9C9486] hover:bg-[#8a8274]"
          >
            Link to Documents
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
