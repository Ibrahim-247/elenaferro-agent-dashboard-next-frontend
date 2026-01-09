import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import useApiMutation from "@/hooks/useApiMutation";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { useQueryClient } from "@tanstack/react-query";

export default function StatusUpdateModal({
  rowId,
  currentStatus,
  onStatusUpdated,
}) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(currentStatus || "");
  const queryClient = useQueryClient();

  //   status update api call
  const statusMutation = useApiMutation({
    key: "lead_status_update",
    isPrivate: true,
    endpoint: `agent/lead/status/${rowId}`,
    onSuccess: (data) => {
      setOpen(false);
      toast.success("Status successfully updated");
      queryClient?.invalidateQueries(["lead_list"]);
      console.log(data);
    },
    onError: (error) => {
      console.error("Lead status update", error);
    },
  });

  const handleStatusUpdate = async () => {
    statusMutation?.mutate({ status: status });
  };

  return (
    <>
      {/* Table cell */}
      <div
        className="text-gray-500 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <SquarePen />
      </div>

      {/* Shadcn Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Status</DialogTitle>
          </DialogHeader>

          {/* Modal body */}
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={statusMutation?.isPending}
            >
              Cancel
            </Button>
            <Button
              className="bg-secondary hover:bg-secondary/90"
              onClick={handleStatusUpdate}
              disabled={statusMutation?.isPending}
            >
              {statusMutation?.isPending && <Spinner />} Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
