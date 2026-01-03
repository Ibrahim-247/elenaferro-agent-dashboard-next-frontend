"use client";
import TransactionHeader from "./TransactionHeader";
import { Button } from "../ui/button";
import { FileText, Plus, SquarePen } from "lucide-react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import { Eye, Pencil } from "lucide-react";
import NewTransactionModal from "./NewTransactionModal";

const data = [
  {
    transactionId: "#TRX-1021",
    clientName: "Sarah Johnson",
    property: "123 Maple Ave, Atlanta, GA",
    status: "Active",
    startDate: "Nov 1, 2025",
    closeDate: "Nov 1, 2025",
    docs: 4,
  },
  {
    transactionId: "#TRX-1021",
    clientName: "Sarah Johnson",
    property: "123 Maple Ave, Atlanta, GA",
    status: "Active",
    startDate: "Nov 1, 2025",
    closeDate: "Nov 1, 2025",
    docs: 4,
  },
  {
    transactionId: "#TRX-1021",
    clientName: "Sarah Johnson",
    property: "123 Maple Ave, Atlanta, GA",
    status: "Active",
    startDate: "Nov 1, 2025",
    closeDate: "Nov 1, 2025",
    docs: 4,
  },
  {
    transactionId: "#TRX-1021",
    clientName: "Sarah Johnson",
    property: "123 Maple Ave, Atlanta, GA",
    status: "Active",
    startDate: "Nov 1, 2025",
    closeDate: "Nov 1, 2025",
    docs: 4,
  },
];

export default function TransactionTable() {
  const columnHelper = createColumnHelper();

  // columns
  const columns = [
    columnHelper.accessor("transactionId", {
      header: "Transaction ID",
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("clientName", {
      header: "Client Name",
    }),

    columnHelper.accessor("property", {
      header: "Property",
    }),

    columnHelper.accessor("status", {
      header: "Status",
      cell: ({ getValue }) => {
        const status = getValue();
        const styles = {
          Active: "bg-green-100 text-green-600",
          Pending: "bg-yellow-100 text-yellow-600",
          Closed: "bg-gray-100 text-gray-600",
          Cancelled: "bg-red-100 text-red-600",
        };

        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}
          >
            {status}
          </span>
        );
      },
    }),

    columnHelper.accessor("startDate", {
      header: "Start Date",
    }),

    columnHelper.accessor("closeDate", {
      header: "Close Date",
    }),

    columnHelper.accessor("docs", {
      header: "Docs",
      cell: ({ getValue }) => (
        <span className="text-blue-600 font-medium cursor-pointer flex items-center gap-1">
          <FileText className="size-4" /> {getValue()}
        </span>
      ),
    }),

    columnHelper.display({
      id: "action",
      header: "Action",
      cell: () => (
        <div className="flex gap-3">
          <div className="size-7 rounded-full bg-[#F4F6F8] flex items-center justify-center cursor-pointer">
            <Eye className="text-gray-500 size-5" />
          </div>
          <div className="size-7 rounded-full bg-[#F4F6F8] flex items-center justify-center cursor-pointer">
            <SquarePen className="text-gray-500 size-5" />
          </div>
        </div>
      ),
    }),
  ];

  // transtack table
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="space-y-6">
      <TransactionHeader />

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Transactions</h2>
        <NewTransactionModal />
      </div>

      {/* table */}
      <div className="w-full">
        {/* ================= DESKTOP TABLE ================= */}
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full">
            <thead className="bg-[#f3efe6]">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-5 text-left text-sm font-medium text-nowrap"
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

            <tbody className="bg-white">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-t">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 text-sm">
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
