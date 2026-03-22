"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { format, parseISO } from "date-fns";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateAppointment,
  useUpdateAppointment,
  useCreateTask,
  useUpdateTask,
} from "@/hooks/calendar.api";
import { useLeadlist } from "@/hooks/crm.api";
import {
  Clock,
  Calendar as CalendarIcon,
  FileText,
  X,
  CheckCircle2,
  Star,
  User,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppointmentSvg from "../svg/AppointmentSvg";
import Calender03Svg from "../svg/Calender03Svg";
import Task01Svg from "../svg/Task01Svg";

const AppointmentModal = ({ isOpen, onClose, selectedDate, appointment }) => {
  const [activeType, setActiveType] = useState("appointment"); // 'appointment', 'task', 'event'

  const createAppointment = useCreateAppointment();
  const updateAppointment = useUpdateAppointment(appointment?.id);
  const createTask = useCreateTask();
  const updateTask = useUpdateTask(appointment?.id);

  const { data: leadData } = useLeadlist();
  const leads = leadData?.data?.data;

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: "appointment",
      title: "",
      date: "",
      time: "",
      description: "",
      priority: "medium",
      status: "in_progress",
      lead_id: "",
    },
  });

  const watchType = useWatch({ control, name: "type" });

  useEffect(() => {
    if (isOpen) {
      if (appointment) {
        const type = appointment.type || "appointment";
        setActiveType(type);
        reset({
          type: type,
          title: appointment.title || appointment.original?.title || "",
          date:
            appointment.date ||
            appointment.original?.date ||
            appointment.original?.due_date ||
            format(selectedDate, "yyyy-MM-dd"),
          time: appointment.time || appointment.original?.time || "",
          description:
            appointment.description || appointment.original?.description || "",
          priority: appointment.original?.priority || "medium",
          status: appointment.original?.status || "in_progress",
          lead_id: appointment.original?.lead_id || "",
        });
      } else {
        setActiveType("appointment");
        reset({
          type: "appointment",
          title: "",
          date: format(selectedDate, "yyyy-MM-dd"),
          time: format(selectedDate, "HH:mm"),
          description: "",
          priority: "medium",
          status: "in_progress",
          lead_id: "",
        });
      }
    }
  }, [isOpen, appointment, selectedDate, reset]);

  // Sync internal state with form state
  useEffect(() => {
    if (watchType) setActiveType(watchType);
  }, [watchType]);

  const onSubmit = (data) => {
    const isEditing = !!appointment;

    if (activeType === "task") {
      const payload = {
        ...data,
        due_date: data.date,
      };
      const mutation = isEditing ? updateTask : createTask;
      mutation.mutate(payload, {
        onSuccess: () => {
          onClose();
          reset();
        },
      });
    } else {
      // Event or Appointment
      const payload = {
        ...data,
        // If event, we might want to flag it as all-day or similar
        // For now, we use the same appointment API
      };
      const mutation = isEditing ? updateAppointment : createAppointment;
      mutation.mutate(payload, {
        onSuccess: () => {
          onClose();
          reset();
        },
      });
    }
  };

  const isPending =
    createAppointment.isPending ||
    updateAppointment.isPending ||
    createTask.isPending ||
    updateTask.isPending;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-[95%] rounded-lg p-0 overflow-auto custom_scroll max-h-[95vh] border-none [&>button]:hidden">
        <div
          className={cn(
            "p-8 flex flex-col items-center justify-center text-white relative transition-colors duration-300",
            activeType === "task"
              ? "bg-blue-600"
              : activeType === "event"
                ? "bg-amber-600"
                : "bg-secondary",
          )}
        >
          <div
            onClick={onClose}
            className="absolute top-5 right-5 p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="size-6" />
          </div>

          <div className="size-14 rounded-xl bg-white/10 flex items-center justify-center mb-4">
            {activeType === "task" ? (
              <Task01Svg className="size-8" />
            ) : activeType === "event" ? (
              <Calender03Svg className="size-8" />
            ) : (
              <AppointmentSvg className="size-8" />
            )}
          </div>

          <DialogTitle className="text-2xl font-bold text-center">
            {appointment ? `Edit ${activeType}` : `New ${activeType}`}
          </DialogTitle>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className=" space-y-5">
          <Tabs
            defaultValue="appointment"
            value={activeType}
            onValueChange={(val) => {
              setActiveType(val);
              setValue("type", val);
            }}
            className="w-full max-w-100 px-6"
          >
            <TabsList className="grid grid-cols-3 w-full bg-white/10 text-white h-9 p-0.5">
              <TabsTrigger
                value="appointment"
                className="text-sm h-8 data-[state=active]:bg-white data-[state=active]:text-secondary"
              >
                Appt
              </TabsTrigger>
              <TabsTrigger
                value="event"
                className="text-sm h-8 data-[state=active]:bg-white data-[state=active]:text-amber-600"
              >
                Event
              </TabsTrigger>
              <TabsTrigger
                value="task"
                className="text-sm h-8 data-[state=active]:bg-white data-[state=active]:text-blue-600"
              >
                Task
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="space-y-4 p-6 pt-0">
            {/* Title Field */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#1D1235] px-1 block capitalize">
                {activeType} Title
              </label>
              <div className="relative">
                <Input
                  {...register("title", { required: "Title is required" })}
                  placeholder={`e.g. ${activeType === "task" ? "Update docs" : activeType === "event" ? "Open House" : "Client Meeting"}`}
                  className="h-12 bg-gray-50 pl-10"
                />
                <FileText className="size-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              {errors.title && (
                <p className="text-red-500 text-xs px-1 font-medium">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Date & Time Fields */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#1D1235] px-1 block">
                  {activeType === "task" ? "Due Date" : "Date"}
                </label>
                <div className="relative flex">
                  <Controller
                    control={control}
                    name="date"
                    rules={{ required: "Date is required" }}
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full h-12 bg-gray-50 pl-10! items-center text-left font-normal justify-start",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="size-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            {field.value ? (
                              format(parseISO(field.value), "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-0 z-9999"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? parseISO(field.value) : undefined
                            }
                            onSelect={(date) =>
                              field.onChange(
                                date ? format(date, "yyyy-MM-dd") : "",
                              )
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                </div>
                {errors.date && (
                  <p className="text-red-500 text-xs px-1 font-medium">
                    {errors.date.message}
                  </p>
                )}
              </div>

              {activeType !== "task" && (
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#1D1235] px-1 block">
                    Time {activeType === "event" && "(Optional)"}
                  </label>
                  <div className="relative">
                    <Input
                      type="time"
                      {...register("time", {
                        required:
                          activeType === "appointment"
                            ? "Time is required"
                            : false,
                      })}
                      className="appearance-none bg-gray-50 h-12 pl-10!"
                    />
                    <Clock className="size-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                  {errors.time && (
                    <p className="text-red-500 text-xs px-1 font-medium">
                      {errors.time.message}
                    </p>
                  )}
                </div>
              )}

              {/* Task Specific Fields: Priority & Link To */}
              {activeType === "task" && (
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#1D1235] px-1 block">
                    Priority
                  </label>
                  <Controller
                    control={control}
                    name="priority"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="h-12! w-full bg-gray-50">
                          <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem
                            value="high"
                            className="text-red-600 font-medium"
                          >
                            High
                          </SelectItem>
                          <SelectItem
                            value="medium"
                            className="text-amber-600 font-medium"
                          >
                            Medium
                          </SelectItem>
                          <SelectItem
                            value="low"
                            className="text-green-600 font-medium"
                          >
                            Normal
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              )}
            </div>

            {activeType === "task" && (
              <div className="space-y-2">
                <label className="text-sm font-bold px-1 block">
                  Link To (Client)
                </label>
                <div className="relative">
                  <Controller
                    control={control}
                    name="lead_id"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value ? String(field.value) : ""}
                      >
                        <SelectTrigger className="h-12! w-full bg-gray-50 pl-10!">
                          <SelectValue placeholder="Select from CRM" />
                        </SelectTrigger>
                        <SelectContent>
                          {leads?.map((item) => (
                            <SelectItem key={item.id} value={String(item.id)}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <User className="size-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 z-10" />
                </div>
              </div>
            )}

            {/* Description Field */}
            <div className="space-y-2">
              <label className="text-sm px-1 block font-medium">
                Description (Optional)
              </label>
              <div className="relative">
                <Textarea
                  {...register("description")}
                  placeholder={`Add some details about the ${activeType}...`}
                  className="min-h-25 bg-gray-50 resize-none p-4"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3  sticky bottom-0 bg-white py-6 px-6 left-0">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 h-10 border-gray-200 text-[#798090] hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className={cn(
                "flex-1 text-white h-10 shadow-sm transition-all active:scale-95",
                activeType === "task"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : activeType === "event"
                    ? "bg-amber-600 hover:bg-amber-700"
                    : "bg-secondary hover:bg-secondary/90",
              )}
            >
              {isPending ? "Saving..." : appointment ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
