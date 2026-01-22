"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CalendarRange, Plus, SquarePen, X } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import useApiMutation from "@/hooks/useApiMutation";
import { useEffect, useState } from "react";
import { useLeadlist } from "@/hooks/crm.api";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export default function EditTaskModal({ data }) {
  const [open, setopen] = useState();
  const queryClient = useQueryClient();

  // lead list
  const { datas } = useLeadlist();
  const leads = datas?.data?.data;

  // hook form
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset({ ...data });
  }, [data]);

  // update task mutation
  const updateTaskMutation = useApiMutation({
    key: "update_task",
    isPrivate: true,
    endpoint: `/agent/task/update/${data?.id}`,
    params: data?.id,
    enabled: !!data?.id,
    onSuccess: () => {
      toast.success("Task updated successfully");
      queryClient.invalidateQueries(["task_list"]);
      setopen(false);
    },
    onError: (error) => {
      console.error("update task", error);
    },
  });

  const onSubmit = (data) => {
    updateTaskMutation?.mutate({
      ...data,
      due_date: data?.due_date
        ? new Date(data?.due_date).toLocaleDateString("en-CA")
        : null,
    });
  };

  const FieldError = ({ error }) =>
    error ? <p className="text-xs text-red-500">{error.message}!</p> : null;

  return (
    <div>
      <Dialog open={open} onOpenChange={setopen}>
        <DialogTrigger asChild>
          <SquarePen className="text-gray-500 cursor-pointer size-5" />
        </DialogTrigger>
        <DialogContent className="max-w-150! [&>button]:hidden p-0">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="overflow-auto max-h-[90vh] space-y-5"
          >
            <DialogClose asChild>
              <div
                type="button"
                className="absolute right-4 top-4 size-8 flex items-center justify-center rounded-full border text-muted-foreground hover:bg-gray-100 hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </div>
            </DialogClose>
            <DialogHeader className="px-8 pt-8">
              <DialogTitle className="text-3xl font-bold text-secondary font-cormorant">
                Edit Task
              </DialogTitle>
            </DialogHeader>

            {/* Transaction Info */}
            <div className="space-y-3 px-8">
              <div className="grid gap-2">
                <label className="text-[#404A60]">Task Title</label>
                <Input
                  placeholder="E.g,, follow up with client about listing.."
                  className="h-10"
                  {...register("title", {
                    required: "Task title is required",
                  })}
                />
                <FieldError error={errors.title} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-[#404A60]">Due Date</label>
                  <Controller
                    control={control}
                    name="due_date"
                    rules={{ required: "Due date is required" }}
                    render={({ field }) => (
                      <>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={`w-full justify-start gap-2 h-10 shadow-none text-gray-500 ${
                                errors.due_date && "border-red-500"
                              }`}
                            >
                              <CalendarRange />
                              {field.value
                                ? new Date(field.value).toLocaleDateString()
                                : "Pick a date"}
                            </Button>
                          </PopoverTrigger>

                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                            />
                          </PopoverContent>
                        </Popover>
                      </>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-[#404A60]">Priority</label>
                  <Controller
                    control={control}
                    name="priority"
                    rules={{ required: "Priority is required" }}
                    render={({ field }) => (
                      <>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger
                            className={`h-10! w-full ${
                              errors.priority && "border-red-500"
                            }`}
                          >
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem
                              value="high"
                              className="flex items-center gap-2"
                            >
                              <div className="size-3 rounded-full bg-red-500"></div>
                              High
                            </SelectItem>
                            <SelectItem
                              value="medium"
                              className="flex items-center gap-2"
                            >
                              <div className="size-3 rounded-full bg-yellow-500"></div>
                              Medium
                            </SelectItem>
                            <SelectItem
                              value="low"
                              className="flex items-center gap-2"
                            >
                              <div className="size-3 rounded-full bg-green-500"></div>
                              Normal
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Link To */}
            <div className="px-8 grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-[#404A60]">Status</label>
                <Controller
                  control={control}
                  name="status"
                  rules={{ required: "Status is required" }}
                  render={({ field }) => (
                    <>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger
                          className={`h-10! w-full ${
                            errors.status && "border-red-500"
                          }`}
                        >
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem
                            value="in_progress"
                            className="flex items-center gap-2"
                          >
                            In Progress
                          </SelectItem>
                          <SelectItem
                            value="blocked"
                            className="flex items-center gap-2"
                          >
                            Blocked
                          </SelectItem>
                          <SelectItem
                            value="done"
                            className="flex items-center gap-2"
                          >
                            Done
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <label className="text-[#404A60]">Link To</label>
                <Controller
                  control={control}
                  name="lead_id"
                  rules={{ required: "Client is required" }}
                  render={({ field }) => (
                    <>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="h-10! w-full">
                          <SelectValue placeholder="Select client" />
                        </SelectTrigger>
                        <SelectContent>
                          {leads?.map((item, index) => (
                            <SelectItem key={index} value={item.id}>
                              {item?.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FieldError error={errors.lead_id} />
                    </>
                  )}
                />
              </div>
            </div>

            <div className="sticky bottom-0 left-0 bg-white pb-8 pt-3 px-8 flex items-center gap-3.5 rounded-2xl">
              <DialogClose asChild>
                <Button
                  onClick={() => setopen(false)}
                  disabled={updateTaskMutation?.isPending}
                  variant="outline"
                  className="w-full shrink h-10"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={updateTaskMutation?.isPending}
                className="bg-secondary text-white hover:bg-secondary/90 w-full shrink h-10"
              >
                Update Task {updateTaskMutation?.isPending && <Spinner />}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
