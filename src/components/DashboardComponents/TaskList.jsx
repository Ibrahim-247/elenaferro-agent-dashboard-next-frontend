"use client";
import { useTasklist } from "@/hooks/dashboard.api";
import { CheckCircle2, Clock, Inbox } from "lucide-react";
import { Spinner } from "../ui/spinner";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";

export default function TaskList() {
  const { data: tasklist, isPending } = useTasklist();
  const tasks = tasklist?.data?.data || [];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-xl font-bold text-[#1D1235]">Upcoming Tasks</h4>
        <span className="bg-secondary/10 text-secondary px-2.5 py-0.5 rounded-full text-xs font-bold">
          {tasks.length}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto custom_scroll pr-2 -mr-2 space-y-3">
        {isPending ? (
          <div className="flex items-center justify-center py-10">
            <Spinner />
          </div>
        ) : tasks.length > 0 ? (
          tasks.map((task, index) => (
            <div
              key={task.id || index}
              className="group p-4 rounded-xl border border-gray-50 bg-gray-50/30 hover:bg-white hover:border-secondary/20 hover:shadow-sm transition-all duration-200"
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "mt-1 rounded-full p-1",
                    task.status === "done"
                      ? "bg-green-100 text-green-600"
                      : "bg-blue-100 text-blue-600"
                  )}
                >
                  <CheckCircle2 className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <h5 className="font-semibold text-gray-900 truncate group-hover:text-secondary transition-colors">
                    {task.title}
                  </h5>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="size-3" />
                      {task.due_date ? format(parseISO(task.due_date), "MMM d, yyyy") : "No date"}
                    </div>
                    {task.priority && (
                      <span
                        className={cn(
                          "text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider",
                          task.priority === "high"
                            ? "bg-red-50 text-red-600"
                            : task.priority === "medium"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-green-50 text-green-600"
                        )}
                      >
                        {task.priority}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="bg-gray-50 p-4 rounded-full mb-3">
              <Inbox className="size-8 text-gray-300" />
            </div>
            <p className="text-gray-500 text-sm font-medium">No tasks found</p>
          </div>
        )}
      </div>
    </div>
  );
}
