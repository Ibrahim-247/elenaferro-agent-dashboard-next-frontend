"use client";
import React, { useState, useMemo } from "react";
import { format, parse, startOfWeek, getDay, parseISO } from "date-fns";
import { enUS } from "date-fns/locale/en-US";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Clock,
  Briefcase,
  CheckCircle2,
  MoreVertical,
  Pencil,
  Trash2,
  Plus,
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

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

const CalendarEventComponent = ({ event, onEdit, onDelete }) => {
  const getIcon = () => {
    switch (event.type) {
      case "task":
        return <CheckCircle2 className="w-3 h-3" />;
      case "transaction":
        return <Briefcase className="w-3 h-3" />;
      case "appointment":
        return <Clock className="w-3 h-3" />;
      default:
        return null;
    }
  };

  return (
    <div
      className="flex items-center justify-between w-full h-full px-1 overflow-hidden"
      title={event.title}
    >
      <div className="flex items-center gap-1.5 truncate">
        <span className="shrink-0 opacity-80">{getIcon()}</span>
        <span className="truncate flex-1 text-xs font-semibold">
          {event.title}
        </span>
      </div>

      {event.type === "appointment" && (
        <div
          className="opacity-0 hover:opacity-100 transition-opacity bg-white/50 backdrop-blur-sm rounded-l-md ml-1"
          onClick={(e) => e.stopPropagation()}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1 hover:bg-black/10 rounded outline-none">
                <MoreVertical className="w-3 h-3" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32 z-9999">
              <DropdownMenuItem onClick={() => onEdit()} className="text-xs">
                <Pencil className="w-3 h-3 mr-2" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete()}
                className="text-xs text-destructive"
              >
                <Trash2 className="w-3 h-3 mr-2" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
};

const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [view, setView] = useState("month");
  const [date, setDate] = useState(new Date());

  // Data fetching
  const { data: tasksData, isPending: tasksPending } = useTasklist();
  const { data: transactionsData, isPending: transactionsPending } =
    useTransactionlist();
  const { data: appointmentsData, isPending: appointmentsPending } =
    useAppointmentList();

  const tasks = tasksData?.data?.data || [];
  const transactions = transactionsData?.data?.data || [];
  const appointments = appointmentsData?.data?.data || [];

  const deleteMutation = useDeleteAppointment();

  const events = useMemo(() => {
    const allEvents = [];

    // Add Tasks
    tasks.forEach((task) => {
      if (task.due_date) {
        allEvents.push({
          id: `task-${task.id}`,
          title: task.title,
          start: parseISO(task.due_date),
          end: parseISO(task.due_date),
          allDay: true,
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
          start: parseISO(tr.start_date),
          end: parseISO(tr.start_date),
          allDay: true,
          type: "transaction",
          original: tr,
        });
      }
      if (tr.close_date) {
        allEvents.push({
          id: `tr-close-${tr.id}`,
          title: `Close: ${tr.client_name}`,
          start: parseISO(tr.close_date),
          end: parseISO(tr.close_date),
          allDay: true,
          type: "transaction",
          original: tr,
        });
      }
    });

    // Add Appointments
    appointments.forEach((app) => {
      if (app.date) {
        let startDate = parseISO(app.date);
        let endDate = new Date(startDate);

        if (app.time) {
          try {
            const timeMatch = app.time.match(/(\d+):(\d+)\s*(AM|PM|am|pm)?/);
            if (timeMatch) {
              let hours = parseInt(timeMatch[1], 10);
              const mins = parseInt(timeMatch[2], 10);
              const ampm = timeMatch[3];
              if (ampm) {
                if (ampm.toUpperCase() === "PM" && hours < 12) hours += 12;
                if (ampm.toUpperCase() === "AM" && hours === 12) hours = 0;
              }
              startDate.setHours(hours, mins, 0);
              endDate = new Date(startDate);
              endDate.setHours(hours + 1, mins, 0);
            }
          } catch (e) {}
        } else {
          endDate.setHours(23, 59, 59);
        }

        allEvents.push({
          id: `app-${app.id}`,
          title: app.title,
          start: startDate,
          end: endDate,
          allDay: !app.time,
          type: "appointment",
          original: app,
        });
      }
    });

    return allEvents;
  }, [tasks, transactions, appointments]);

  const isDataPending =
    tasksPending || transactionsPending || appointmentsPending;

  const CustomToolbar = React.useCallback((toolbar) => {
    const goToBack = () => {
      toolbar.onNavigate("PREV");
    };

    const goToNext = () => {
      toolbar.onNavigate("NEXT");
    };

    const goToCurrent = () => {
      toolbar.onNavigate("TODAY");
    };

    const label = () => {
      return (
        <h2 className="text-2xl font-bold text-[#1D1235]">{toolbar.label}</h2>
      );
    };

    return (
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 px-2">
        <div className="flex items-center gap-4">{label()}</div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            onClick={() => {
              setEditingAppointment(null);
              setSelectedDate(new Date());
              setIsModalOpen(true);
            }}
            className="bg-secondary text-white hover:bg-secondary/90 px-5 h-9"
          >
            <Plus />
            New Appointment
          </Button>

          <div className="flex items-center bg-gray-50/80 rounded-sm p-1 border border-gray-100/80">
            <Button
              variant="ghost"
              onClick={goToBack}
              className="h-9 px-3 rounded-sm hover:bg-white hover:shadow-xs text-xs font-medium text-gray-600 transition-all"
            >
              Back
            </Button>
            <Button
              variant="ghost"
              onClick={goToCurrent}
              className="h-9 px-3 rounded-sm hover:bg-white hover:shadow-xs text-xs font-medium text-gray-800 transition-all"
            >
              Today
            </Button>
            <Button
              variant="ghost"
              onClick={goToNext}
              className="h-9 px-3 rounded-sm hover:bg-white hover:shadow-xs text-xs font-medium text-gray-600 transition-all"
            >
              Next
            </Button>
          </div>

          <div className="items-center bg-gray-50/80 rounded-sm p-1 border border-gray-100/80 hidden sm:flex">
            {["month", "week", "work_week", "day", "agenda"].map((v) => (
              <Button
                key={v}
                variant="ghost"
                onClick={() => toolbar.onView(v)}
                className={`h-9 px-3 rounded-sm text-xs capitalize transition-all ${
                  toolbar.view === v
                    ? "bg-white text-secondary"
                    : "hover:bg-white/60 text-gray-600 font-medium"
                }`}
              >
                {v.replace("_", " ")}
              </Button>
            ))}
          </div>
        </div>
      </div>
    );
  }, []);

  const components = React.useMemo(
    () => ({
      toolbar: CustomToolbar,
      event: ({ event }) => (
        <CalendarEventComponent
          event={event}
          onEdit={() => {
            if (event.type === "appointment") {
              setEditingAppointment(event.original);
              setIsModalOpen(true);
            }
          }}
          onDelete={() => {
            if (event.type === "appointment") {
              deleteMutation.mutate(event.original.id);
            }
          }}
        />
      ),
    }),
    [CustomToolbar],
  );

  const eventPropGetter = (event) => {
    let className = "shadow-sm border rounded-md ";
    switch (event.type) {
      case "task":
        className += "bg-blue-50 text-blue-700 border-blue-200";
        break;
      case "transaction":
        className += "bg-amber-50 text-amber-700 border-amber-200";
        break;
      case "appointment":
        className += "bg-purple-50 text-purple-700 border-purple-200";
        break;
      default:
        className += "bg-gray-50 text-gray-700 border-gray-200";
        break;
    }
    return {
      className,
      style: {
        backgroundColor: "transparent",
        color: "inherit",
        border: "none",
        padding: "0px",
      },
    };
  };

  return (
    <div className="bg-white p-2 md:p-6 rounded-xl border border-gray-50 h-[calc(100vh-140px)] min-h-175 flex flex-col relative">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .rbc-calendar { font-family: inherit; }
        .rbc-toolbar { margin-bottom: 24px; }
        .rbc-month-view { border-radius: 16px; overflow: hidden; border: 1px solid #f3f4f6; }
        .rbc-day-bg { transition: background-color 0.2s; }
        .rbc-day-bg:hover { background-color: #f9fafb; cursor: pointer; }
        .rbc-off-range-bg { background-color: #f9fafb; }
        .rbc-today { background-color: #fffaf0; }
        .rbc-header { padding: 12px 0; font-weight: 700; color: #6b7280; font-size: 13px; text-transform: uppercase; border-bottom: 1px solid #f3f4f6; }
        .rbc-date-cell { padding: 8px; font-weight: 600; font-size: 14px; }
        .rbc-event { padding: 0 !important; background: transparent !important; }
        .rbc-event-content { padding: 0 !important; height: 100%; }
        .rbc-time-view { border-radius: 16px; overflow: hidden; border: 1px solid #f3f4f6; }
        .rbc-time-header-content { border-left: 1px solid #f3f4f6; }
        .rbc-timeslot-group { border-bottom: 1px solid #f3f4f6; min-height: 50px; }
        .rbc-agenda-view { border-radius: 16px; overflow: hidden; border: 1px solid #f3f4f6; padding: 10px }
        .rbc-agenda-date-cell { font-weight: 600; }
        
      `,
        }}
      />

      {/* {isDataPending && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-50 flex items-center justify-center rounded-3xl">
          <Spinner className="w-10 h-10" />
        </div>
      )} */}

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        view={view}
        onView={setView}
        date={date}
        onNavigate={setDate}
        style={{ height: "100%", width: "100%" }}
        components={components}
        eventPropGetter={eventPropGetter}
        onSelectSlot={(slotInfo) => {
          setSelectedDate(slotInfo.start);
          setEditingAppointment(null);
          setIsModalOpen(true);
        }}
        selectable={true}
        popup={true}
      />

      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={selectedDate}
        appointment={editingAppointment}
      />
    </div>
  );
};

export default CalendarView;
