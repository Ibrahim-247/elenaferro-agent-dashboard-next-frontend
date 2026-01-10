"use client";
import TransactionHeader from "./TransactionHeader";
import { Button } from "../ui/button";
import { FileText, Inbox, Plus, SquarePen } from "lucide-react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import { Eye, Pencil } from "lucide-react";
import NewTransactionModal from "./NewTransactionModal";
import { ViewDocumentModal } from "./ViewDocumentModal";
import LinkDocModal from "./LinkDocModal";
import { useTransactionlist } from "@/hooks/transaction.api";
import { useMemo, useState } from "react";
import { Spinner } from "../ui/spinner";
import EditTransaction from "./EditTransaction";

export default function TransactionTable() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [date, setDate] = useState(undefined);
  const columnHelper = createColumnHelper();
  console.log(date);

  // transaction list
  const { data: transactions, isPending } = useTransactionlist();
  const data = transactions?.data?.data || [];

  // filter logic
  const filteredData = useMemo(() => {
    return data?.filter((lead) => {
      const matchSearch =
        lead?.client_name?.toLowerCase().includes(search.toLowerCase()) ||
        lead?.transaction_id?.toLowerCase().includes(search.toLowerCase());

      const matchStatus = status === "all" || lead?.status === status;
      const matchDate =
        !date ||
        (lead?.start_date || lead?.close_date) ===
          date.toLocaleDateString("en-CA");

      return matchSearch && matchStatus && matchDate;
    });
  }, [search, date, status, data]);

  console.log(data);

  // columns
  const columns = [
    columnHelper.accessor("transaction_id", {
      header: "Transaction ID",
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("client_name", {
      header: "Client Name",
    }),

    columnHelper.accessor("property_address", {
      header: "Property",
    }),

    columnHelper.accessor("status", {
      header: "Status",
      cell: ({ getValue }) => {
        const status = getValue();
        const styles = {
          active: "bg-green-100 text-green-600",
          pending: "bg-yellow-100 text-yellow-600",
          closed: "bg-gray-100 text-gray-600",
          cancelled: "bg-red-100 text-red-600",
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

    columnHelper.accessor("start_date", {
      header: "Start Date",
    }),

    columnHelper.accessor("close_date", {
      header: "Close Date",
    }),

    columnHelper.accessor("total_document", {
      header: "Docs",
      cell: ({ row }) => <LinkDocModal data={row?.original} />,
    }),

    columnHelper.display({
      id: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex gap-3">
          <ViewDocumentModal data={row?.original} />
          <EditTransaction datas={row?.original} />
        </div>
      ),
    }),
  ];

  // transtack table
  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="space-y-6">
      <TransactionHeader
        setSearch={setSearch}
        setStatus={setStatus}
        setDate={setDate}
        search={search}
        status={status}
        date={date}
      />

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
              <tbody className="bg-white">
                {table?.getRowModel()?.rows?.map((row) => (
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
