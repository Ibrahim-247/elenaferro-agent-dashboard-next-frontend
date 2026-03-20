"use client";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateAppointment,
  useUpdateAppointment,
} from "@/hooks/calendar.api";
import { Clock, Calendar as CalendarIcon, FileText, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const AppointmentModal = ({ isOpen, onClose, selectedDate, appointment }) => {
  const createMutation = useCreateAppointment();
  const updateMutation = useUpdateAppointment(appointment?.id);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      date: "",
      time: "",
      description: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (appointment) {
        reset({
          title: appointment.title,
          date: appointment.date,
          time: appointment.time,
          description: appointment.description,
        });
      } else {
        reset({
          title: "",
          date: format(selectedDate, "yyyy-MM-dd"),
          time: format(selectedDate, "HH:mm"),
          description: "",
        });
      }
    }
  }, [isOpen, appointment, selectedDate, reset]);

  const onSubmit = (data) => {
    if (appointment) {
      updateMutation.mutate(data, {
        onSuccess: () => {
          onClose();
          reset();
        },
      });
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          onClose();
          reset();
        },
      });
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-[95%] rounded-lg p-0 overflow-auto max-h-[95vh] border-none [&>button]:hidden">
        <div className="bg-secondary p-8 flex flex-col items-center justify-center text-white relative">
          <div
            onClick={onClose}
            className="absolute top-5 right-5 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="size-6" />
          </div>
          <div className="size-16 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
            <CalendarIcon className="size-8" />
          </div>
          <DialogTitle className="text-2xl font-bold text-center">
            {appointment ? "Edit Appointment" : "New Appointment"}
          </DialogTitle>
          <p className="text-white/70 text-sm mt-1">
            {appointment
              ? "Update your appointment details"
              : `Scheduling for ${format(selectedDate, "MMM dd, yyyy")}`}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#1D1235] px-1 block">
                Appointment Title
              </label>
              <div className="relative">
                <Input
                  {...register("title", { required: "Title is required" })}
                  placeholder="e.g. Client Meeting"
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

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#1D1235] px-1 block">
                  Date
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
                              format(new Date(field.value), "PPP")
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
                              field.value ? new Date(field.value) : undefined
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
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#1D1235] px-1 block">
                  Time
                </label>
                <div className="relative">
                  <Input
                    type="time"
                    id="time-picker-optional"
                    step="1"
                    {...register("time", { required: "Time is required" })}
                    defaultValue="10:30:00"
                    className="appearance-none bg-gray-50 h-12 pl-10 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                  />

                  <Clock className="size-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
                {errors.time && (
                  <p className="text-red-500 text-xs px-1 font-medium">
                    {errors.time.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-[#1D1235] px-1 block">
                Description (Optional)
              </label>
              <Textarea
                {...register("description")}
                placeholder="Add some details about the appointment..."
                className="min-h-25 bg-gray-50 resize-none p-4"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2 sticky bottom-0 left-0">
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
              className="flex-1 bg-secondary text-white hover:bg-secondary/90 h-10 shadow-secondary/20 transition-all active:scale-95"
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
