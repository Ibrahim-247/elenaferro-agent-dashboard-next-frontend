"use client";
import React, { useState, useMemo, useEffect } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
  parseISO,
} from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  Briefcase,
  CheckCircle2,
  Calendar as CalendarIcon,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTasklist } from "@/hooks/dashboard.api";
import { useTransactionlist } from "@/hooks/transaction.api";
import { useAppointmentList, useDeleteAppointment } from "@/hooks/calendar.api";
import AppointmentModal from "./AppointmentModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";

const CalendarView = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);

  // Data fetching
  const { data: tasksData, isPending: tasksPending } = useTasklist();
  const { data: transactionsData, isPending: transactionsPending } = useTransactionlist();
  const { data: appointmentsData, isPending: appointmentsPending } = useAppointmentList();

  const tasks = tasksData?.data?.data || [];
  const transactions = transactionsData?.data?.data || [];
  const appointments = appointmentsData?.data?.data || [];

  const deleteMutation = useDeleteAppointment();

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const events = useMemo(() => {
    const allEvents = [];

    // Add Tasks
    tasks.forEach((task) => {
      if (task.due_date) {
        allEvents.push({
          id: `task-${task.id}`,
          title: task.title,
          date: parseISO(task.due_date),
          type: "task",
          status: task.status,
          priority: task.priority,
          original: task,
        });
      }
    });

    // Add Transactions
    transactions.forEach((tr) => {
      if (tr.start_date) {
        allEvents.push({
          id: `tr-start-${tr.id}`,
          title: `Start: ${tr.client_name}`,
          date: parseISO(tr.start_date),
          type: "transaction",
          original: tr,
        });
      }
      if (tr.close_date) {
        allEvents.push({
          id: `tr-close-${tr.id}`,
          title: `Close: ${tr.client_name}`,
          date: parseISO(tr.close_date),
          type: "transaction",
          original: tr,
        });
      }
    });

    // Add Appointments
    appointments.forEach((app) => {
      if (app.date) {
        allEvents.push({
          id: `app-${app.id}`,
          title: app.title,
          date: parseISO(app.date),
          time: app.time,
          type: "appointment",
          original: app,
        });
      }
    });

    return allEvents;
  }, [tasks, transactions, appointments]);

  const renderHeader = () => (
    <div className="flex items-center justify-between mb-8">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold text-[#1D1235]">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevMonth}
            className="h-9 w-9 rounded-lg hover:bg-white hover:shadow-sm"
          >
            <ChevronLeft className="size-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextMonth}
            className="h-9 w-9 rounded-lg hover:bg-white hover:shadow-sm"
          >
            <ChevronRight className="size-5" />
          </Button>
        </div>
        <Button
          onClick={() => {
            setEditingAppointment(null);
            setIsModalOpen(true);
          }}
          className="bg-secondary text-white hover:bg-secondary/90 px-6 rounded-xl h-11 font-semibold transition-all active:scale-95"
        >
          <Plus className="size-5 mr-2" />
          New Appointment
        </Button>
      </div>
    </div>
  );

  const renderDays = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <div className="grid grid-cols-7 mb-2">
        {days.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-bold text-[#798090] py-2 uppercase tracking-wider"
          >
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "d");
        const cloneDay = day;
        const dayEvents = events.filter((e) => isSameDay(e.date, cloneDay));

        days.push(
          <div
            key={day.toString()}
            className={`min-h-[140px] border border-gray-100 p-3 transition-colors ${
              !isSameMonth(day, monthStart)
                ? "bg-gray-50/50 text-gray-300"
                : "bg-white hover:bg-gray-50/30"
            } ${isSameDay(day, new Date()) ? "ring-2 ring-secondary/20 ring-inset" : ""}`}
            onClick={() => setSelectedDate(cloneDay)}
          >
            <div className="flex justify-between items-start mb-2">
              <span
                className={`text-sm font-bold size-7 flex items-center justify-center rounded-full ${
                  isSameDay(day, new Date())
                    ? "bg-secondary text-white shadow-lg shadow-secondary/20"
                    : "text-[#1D1235]"
                }`}
              >
                {formattedDate}
              </span>
              {dayEvents.length > 0 && isSameMonth(day, monthStart) && (
                <span className="size-2 rounded-full bg-secondary"></span>
              )}
            </div>
            <div className="space-y-1.5 overflow-y-auto max-h-[100px] custom-scrollbar pr-1">
              {dayEvents.slice(0, 3).map((event) => (
                <CalendarEvent key={event.id} event={event} onEdit={() => {
                  if (event.type === 'appointment') {
                    setEditingAppointment(event.original);
                    setIsModalOpen(true);
                  }
                }} onDelete={() => {
                  if (event.type === 'appointment') {
                    deleteMutation.mutate(event.original.id);
                  }
                }} />
              ))}
              {dayEvents.length > 3 && (
                <div className="text-[10px] font-bold text-secondary text-center py-0.5 bg-secondary/5 rounded-md">
                  +{dayEvents.length - 3} more
                </div>
              )}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7">
          {days}
        </div>
      );
      days = [];
    }
    return <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm">{rows}</div>;
  };

  const isDataPending = tasksPending || transactionsPending || appointmentsPending;

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50">
      {renderHeader()}
      <div className="relative">
        {isDataPending && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-10 flex items-center justify-center">
            <Spinner className="size-10" />
          </div>
        )}
        {renderDays()}
        {renderCells()}
      </div>

      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={selectedDate}
        appointment={editingAppointment}
      />
    </div>
  );
};

const CalendarEvent = ({ event, onEdit, onDelete }) => {
  const getStyles = () => {
    switch (event.type) {
      case "task":
        return "bg-blue-50 text-blue-700 border-blue-100";
      case "transaction":
        return "bg-amber-50 text-amber-700 border-amber-100";
      case "appointment":
        return "bg-purple-50 text-purple-700 border-purple-100";
      default:
        return "bg-gray-50 text-gray-700 border-gray-100";
    }
  };

  const getIcon = () => {
    switch (event.type) {
      case "task":
        return <CheckCircle2 className="size-3" />;
      case "transaction":
        return <Briefcase className="size-3" />;
      case "appointment":
        return <Clock className="size-3" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`group relative flex items-center gap-1.5 px-2 py-1.5 rounded-lg border text-[11px] font-semibold truncate transition-all ${getStyles()}`}
    >
      <span className="shrink-0 opacity-80">{getIcon()}</span>
      <span className="truncate flex-1">{event.title}</span>
      
      {event.type === 'appointment' && (
        <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute right-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-0.5 hover:bg-black/5 rounded outline-none">
                <MoreVertical className="size-3" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem onClick={onEdit} className="text-xs">
                <Pencil className="size-3 mr-2" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDelete} className="text-xs text-destructive">
                <Trash2 className="size-3 mr-2" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
};

export default CalendarView;
