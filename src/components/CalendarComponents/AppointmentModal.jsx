"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateAppointment, useUpdateAppointment } from "@/hooks/calendar.api";
import { Clock, Calendar as CalendarIcon, FileText, X } from "lucide-react";

const AppointmentModal = ({ isOpen, onClose, selectedDate, appointment }) => {
  const createMutation = useCreateAppointment();
  const updateMutation = useUpdateAppointment(appointment?.id);

  const {
    register,
    handleSubmit,
    reset,
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
          time: format(new Date(), "HH:mm"),
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
      <DialogContent className="max-w-md w-[95%] rounded-3xl p-0 overflow-hidden border-none shadow-2xl">
        <div className="bg-secondary p-8 flex flex-col items-center justify-center text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="size-6" />
          </button>
          <div className="size-16 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
            <CalendarIcon className="size-8" />
          </div>
          <DialogTitle className="text-2xl font-bold text-center">
            {appointment ? "Edit Appointment" : "New Appointment"}
          </DialogTitle>
          <p className="text-white/70 text-sm mt-1">
            {appointment ? "Update your appointment details" : `Scheduling for ${format(selectedDate, "MMM dd, yyyy")}`}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#1D1235] px-1">
                Appointment Title
              </label>
              <div className="relative">
                <Input
                  {...register("title", { required: "Title is required" })}
                  placeholder="e.g. Client Meeting"
                  className="h-12 rounded-xl bg-gray-50 border-gray-100 focus:bg-white transition-all pl-10"
                />
                <FileText className="size-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              {errors.title && (
                <p className="text-red-500 text-xs px-1 font-medium">{errors.title.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#1D1235] px-1">
                  Date
                </label>
                <div className="relative">
                  <Input
                    type="date"
                    {...register("date", { required: "Date is required" })}
                    className="h-12 rounded-xl bg-gray-50 border-gray-100 focus:bg-white transition-all pl-10"
                  />
                  <CalendarIcon className="size-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
                {errors.date && (
                  <p className="text-red-500 text-xs px-1 font-medium">{errors.date.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#1D1235] px-1">
                  Time
                </label>
                <div className="relative">
                  <Input
                    type="time"
                    {...register("time", { required: "Time is required" })}
                    className="h-12 rounded-xl bg-gray-50 border-gray-100 focus:bg-white transition-all pl-10"
                  />
                  <Clock className="size-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
                {errors.time && (
                  <p className="text-red-500 text-xs px-1 font-medium">{errors.time.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-[#1D1235] px-1">
                Description (Optional)
              </label>
              <Textarea
                {...register("description")}
                placeholder="Add some details about the appointment..."
                className="min-h-[100px] rounded-xl bg-gray-50 border-gray-100 focus:bg-white transition-all resize-none p-4"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 h-12 rounded-xl text-base font-bold border-gray-200 text-[#798090] hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="flex-1 bg-secondary text-white hover:bg-secondary/90 h-12 rounded-xl text-base font-bold shadow-lg shadow-secondary/20 transition-all active:scale-95"
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
