"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useApiMutation from "@/hooks/useApiMutation";
import { Trash2 } from "lucide-react";
import { Spinner } from "../ui/spinner";
import { useState } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export default function DeleteModal({ id }) {
  const [open, setopen] = useState(false);
  const queryClient = useQueryClient();

  // logout mutation
  const deleteMutation = useApiMutation({
    key: "delete_task",
    endpoint: `/agent/task/delete/${id}`,
    isPrivate: true,
    method: "delete",
    onSuccess: () => {
      setopen(false);
      queryClient.invalidateQueries(["task_list"]);
      toast.success("Successfully deleted");
    },
    onError: (error) => {
      console.error("Delete task error:", error);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger asChild>
        <Trash2 className="cursor-pointer size-5 text-red-500" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-106">
        <DialogHeader>
          <DialogTitle>Confirm delete</DialogTitle>
          <DialogDescription>
            Please confirm that you want to delete of your account.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => setopen(false)}
              disabled={deleteMutation?.isPending}
              variant="outline"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={() => deleteMutation?.mutate()}
            disabled={deleteMutation?.isPending}
            type="submit"
            className="bg-red-500 hover:bg-red-400"
          >
            Delete {deleteMutation?.isPending && <Spinner />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
