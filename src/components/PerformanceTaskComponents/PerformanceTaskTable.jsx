"use client";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Trash2, SquarePen } from "lucide-react";
import PerformanceTaskHeader from "./PerformanceTaskHeader";

const data = [
  {
    title: "Follow up with client",
    client: "Jerry Helfer",
    dueDate: "12 Nov 2025",
    priority: "High",
    status: "In Progress",
    assignedTo: "Self",
  },
  {
    title: "Confirm client signed documents",
    client: "Jerry Helfer",
    dueDate: "12 Nov 2025",
    priority: "Low",
    status: "Blocked",
    assignedTo: "Admin",
  },
  {
    title: "Schedule meeting with client",
    client: "Jerry Helfer",
    dueDate: "12 Nov 2025",
    priority: "Medium",
    status: "Done",
    assignedTo: "Self",
  },
];

export default function PerformanceTaskTable() {
  const priorityStyles = {
    High: "bg-red-100 text-red-600",
    Medium: "bg-yellow-100 text-yellow-600",
    Low: "bg-green-100 text-green-600",
  };

  const statusStyles = {
    "In Progress": "bg-blue-100 text-blue-600",
    Blocked: "bg-red-100 text-red-600",
    Done: "bg-green-100 text-green-600",
  };

  /* ================= COLUMNS ================= */
  const columns = [
    {
      accessorKey: "title",
      header: "Task Title",
    },
    {
      accessorKey: "client",
      header: "Client",
      cell: ({ row }) => (
        <span className="px-3 py-1 text-sm border rounded-full">
          {row.original.client}
        </span>
      ),
    },
    {
      accessorKey: "dueDate",
      header: "Due Date",
    },
    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => (
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
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
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            statusStyles[row.original.status]
          }`}
        >
          {row.original.status}
        </span>
      ),
    },
    {
      accessorKey: "assignedTo",
      header: "Assigned To",
    },
    {
      id: "action",
      header: "Action",
      cell: () => (
        <div className="flex gap-3">
          <SquarePen className="text-gray-500 cursor-pointer size-5" />
          <Trash2 size={18} className="cursor-pointer text-red-500" />
        </div>
      ),
    },
  ];

  // transtack table
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="space-y-6">
      <PerformanceTaskHeader />

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
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
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
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
