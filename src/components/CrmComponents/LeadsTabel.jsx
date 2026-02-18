"use client";
import { useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Inbox, Search } from "lucide-react";
import CreateLead from "./CreateLead";
import { useLeadlist } from "@/hooks/crm.api";
import { Spinner } from "../ui/spinner";
import LeadUpdateModal from "./LeadUpdateModal";
import DeleteModal from "../common/DeleteModal";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import useApiMutation from "@/hooks/useApiMutation";

// status update select
const statusStyle = {
  new: "bg-blue-100 text-blue-600",
  contacted: "bg-yellow-100 text-yellow-600",
  converted: "bg-green-100 text-green-600",
  lost: "bg-red-100 text-red-600",
};

export default function LeadsTabel() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");
  const [id, setid] = useState();
  const [open, setopen] = useState();
  const queryClient = useQueryClient();

  // lead list hooks
  const { data, isPending } = useLeadlist();
  const leads = data?.data?.data || [];

  // laad delete
  const deleteMutation = useApiMutation({
    key: "delete_lead",
    endpoint: `/agent/lead/delete/${id}`,
    isPrivate: true,
    method: "delete",
    onSuccess: () => {
      setopen(false);
      queryClient.invalidateQueries(["lead_list"]);
      toast.success("Successfully deleted");
    },
    onError: (error) => {
      console.error("Delete task error:", error);
    },
  });

  // filter logic
  const filteredData = useMemo(() => {
    return leads?.filter((lead) => {
      const matchSearch =
        lead?.full_name?.toLowerCase().includes(search.toLowerCase()) ||
        lead?.email?.toLowerCase().includes(search.toLowerCase()) ||
        lead?.phone?.includes(search);

      const matchType = type === "all" || lead?.lead_type === type;
      const matchStatus = status === "all" || lead?.status === status;

      return matchSearch && matchType && matchStatus;
    });
  }, [search, type, status, leads]);

  // TABLE COLUMNS
  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ getValue }) => getValue() || "N/A",
    },
    {
      accessorKey: "lead_type",
      header: "Type",
      cell: ({ getValue }) =>
        getValue()
          ? getValue().replace(/\b\w/g, (c) => c.toUpperCase())
          : "N/A" || "N/A",
    },
    {
      accessorKey: "notes",
      header: "Notes",
      cell: ({ row }) => (
        <span className="truncate max-w-50 block">
          {row.original.notes || "N/A"}
        </span>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <a href={`mailto:${row.original.email}`} className="text-blue-600">
          {row.original.email || "N/A"}
        </a>
      ),
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ getValue }) => getValue() || "N/A",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div
          className={`py-1 text-sm capitalize w-fit px-3 rounded-full border-none ${
            statusStyle[row.original.status]
          }`}
        >
          {row.original.status}
        </div>
      ),
    },
    {
      accessorKey: "edit",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <LeadUpdateModal data={row?.original} />
          <div onClick={setid(row?.original?.id)}>
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

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-6">
      {/* filter and search */}
      <div className="flex flex-col md:flex-row gap-5 bg-white p-6 rounded-2xl">
        <div className="relative w-full">
          <Input
            placeholder="Search name, email or phone"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-12 pl-10"
          />
          <Search className="absolute top-1/2 -translate-y-1/2 left-2 text-gray-500" />
        </div>

        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="md:w-40 w-full h-12!">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="buyer">Buyer</SelectItem>
            <SelectItem value="seller">Seller</SelectItem>
          </SelectContent>
        </Select>

        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="md:w-40 w-full h-12!">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="converted">Converted</SelectItem>
          </SelectContent>
        </Select>

        {/* create lead modal */}
        <CreateLead />
      </div>
      {/* leads table */}
      <div className="bg-white p-4 md:p-6 rounded-2xl space-y-6">
        <h5 className="text-xl font-semibold text-[#0C58FF] mb-6">Leads</h5>
        <div className="relative w-full overflow-x-auto rounded-lg border border-primary/50">
          <table className="min-w-225 w-full">
            <thead className="bg-[#F5F6F7]">
              {table.getHeaderGroups().map((group) => (
                <tr key={group.id}>
                  {group.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap border-r border-primary/50 last:border-r-0"
                    >
                      {flexRender(
                        header.column.columnDef.header ?? "N/A",
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
                {table.getRowModel().rows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={table.getAllColumns().length}
                      className="py-6 text-center text-sm"
                    >
                      No data found
                    </td>
                  </tr>
                ) : (
                  table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="border-t border-t-primary/50">
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="px-4 py-3 text-sm whitespace-nowrap border-r border-r-primary/50 last:border-r-0"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
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
