"use client";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Inbox } from "lucide-react";
import PerformanceTaskHeader from "./PerformanceTaskHeader";
import EditTaskModal from "./EditTaskModal";
import { useMemo, useState } from "react";
import { useTasklist } from "@/hooks/dashboard.api";
import { Spinner } from "../ui/spinner";
import DeleteModal from "../common/DeleteModal";
import useApiMutation from "@/hooks/useApiMutation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function PerformanceTaskTable() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");
  const queryClient = useQueryClient();
  const [open, setopen] = useState(false);
  const [taskId, settaskId] = useState();

  // task table data
  const { data: tasklist, isPending } = useTasklist();
  const data = tasklist?.data?.data;

  // task delete
  const deleteMutation = useApiMutation({
    key: "delete_task",
    endpoint: `/agent/task/delete/${taskId}`,
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

  // filter logic
  const filteredData = useMemo(() => {
    return data?.filter((lead) => {
      const matchSearch = lead?.title
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchType = type === "all" || lead?.priority === type;
      const matchStatus = status === "all" || lead?.status === status;

      return matchSearch && matchType && matchStatus;
    });
  }, [search, type, status, data]);

  const priorityStyles = {
    high: "bg-red-100 text-red-600",
    medium: "bg-yellow-100 text-yellow-600",
    low: "bg-green-100 text-green-600",
  };

  const statusStyles = {
    in_progress: "bg-blue-100 text-blue-600",
    blocked: "bg-red-100 text-red-600",
    done: "bg-green-100 text-green-600",
  };

  /* ================= COLUMNS ================= */
  const columns = [
    {
      accessorKey: "title",
      header: "Task Title",
    },
    {
      accessorKey: "name",
      header: "Client",
      cell: ({ row }) => (
        <span className="px-3 py-1 text-sm border rounded-full">
          {row.original.name}
        </span>
      ),
    },
    {
      accessorKey: "due_date",
      header: "Due Date",
      cell: ({ row }) => (
        <span>
          {new Date(row.original.due_date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          })}
        </span>
      ),
    },
    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => (
        <span
          className={`px-3 py-1 rounded-full text-sm capitalize font-medium ${
            priorityStyles[row.original.priority]
          }`}
        >
          {row.original.priority}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`px-3 py-1 rounded-full capitalize text-sm font-medium ${
            statusStyles[row.original.status]
          }`}
        >
          {row.original.status}
        </span>
      ),
    },
    {
      accessorKey: "assigned_by_admin",
      header: "Assigned To",
    },
    {
      id: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex gap-3 items-center">
          <EditTaskModal data={row?.original} />
          <div onClick={() => settaskId(row?.original?.id)}>
            <DeleteModal
              deleteMutation={deleteMutation}
              open={open}
              setopen={setopen}
            />
          </div>
        </div>
      ),
    },
  ];

  // transtack table
  const table = useReactTable({
    data: filteredData || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="space-y-6">
      <PerformanceTaskHeader
        setSearch={setSearch}
        setType={setType}
        setStatus={setStatus}
        search={search}
        type={type}
        status={status}
      />

      {/* table */}
      <div className="w-full p-6 bg-white rounded-xl space-y-6">
        <div>
          <h4 className="text-xl font-semibold text-secondary">
            Task & Performance
          </h4>
          <p className="text-base font-normal text-[#5B6477]">
            Manage your tasks and track your performance across all clients and
            transactions.
          </p>
        </div>
        <div className="overflow-x-auto border border-black/50 rounded-xl">
          <table className="w-full text-sm">
            <thead className="bg-[#F5F6F7]">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="text-left px-4 py-4 font-semibold border-x border-black/50 border-b first:border-l-0 last:border-r-0"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {isPending ? (
              <tbody>
                <tr>
                  <td
                    colSpan={table.getAllColumns().length}
                    className="h-40 text-center text-base"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Spinner /> Loading...
                    </div>
                  </td>
                </tr>
              </tbody>
            ) : filteredData?.length > 0 ? (
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b last:border-none border-b-black/50"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-4 py-4 border-x border-x-black/50 last:border-r-0 first:border-l-0"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td
                    colSpan={table.getAllColumns().length}
                    className="h-40 text-center text-base"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Inbox className="text-gray-400 size-13" /> No data found
                    </div>
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}
