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
import { Search } from "lucide-react";
import CreateLead from "./CreateLead";

// leads data
const leads = [
  {
    name: "Jerry Helfer",
    type: "Buyer",
    note: "Interested in downtown property",
    email: "autumn_philips@aol.com",
    phone: "(555) 123-4567",
    status: "New",
  },
  {
    name: "Jerry Helfer",
    type: "Seller",
    note: "Interested in downtown property",
    email: "autumn_philips@aol.com",
    phone: "(555) 123-4567",
    status: "Contacted",
  },
  {
    name: "Jerry Helfer",
    type: "Buyer",
    note: "Interested in downtown property",
    email: "autumn_philips@aol.com",
    phone: "(555) 123-4567",
    status: "Converted",
  },
];

// status update select
const statusStyle = {
  New: "bg-blue-100 text-blue-600",
  Contacted: "bg-yellow-100 text-yellow-600",
  Converted: "bg-green-100 text-green-600",
};

function StatusSelect({ value, onChange }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        className={`h-8 w-fit px-3 rounded-full border-none ${statusStyle[value]}`}
      >
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {Object.keys(statusStyle).map((status) => (
          <SelectItem key={status} value={status}>
            {status}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default function LeadsTabel() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");

  // filter logic
  const filteredData = useMemo(() => {
    return leads.filter((lead) => {
      const matchSearch =
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.email.toLowerCase().includes(search.toLowerCase()) ||
        lead.phone.includes(search);

      const matchType = type === "all" || lead.type === type;
      const matchStatus = status === "all" || lead.status === status;

      return matchSearch && matchType && matchStatus;
    });
  }, [search, type, status]);

  // TABLE COLUMNS
  const columns = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "type", header: "Type" },
    {
      accessorKey: "note",
      header: "Notes",
      cell: ({ row }) => (
        <span className="truncate max-w-[200px] block">
          {row.original.note}
        </span>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <a href={`mailto:${row.original.email}`} className="text-blue-600">
          {row.original.email}
        </a>
      ),
    },
    { accessorKey: "phone", header: "Phone" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <StatusSelect
          value={row.original.status}
          onChange={(newStatus) => {
            row.original.status = newStatus;
          }}
        />
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
          <SelectTrigger className="md:w-40 h-12!">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Buyer">Buyer</SelectItem>
            <SelectItem value="Seller">Seller</SelectItem>
          </SelectContent>
        </Select>

        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="md:w-40 h-12!">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="Contacted">Contacted</SelectItem>
            <SelectItem value="Converted">Converted</SelectItem>
          </SelectContent>
        </Select>

        {/* create lead modal */}
        <CreateLead />
      </div>
      {/* leads table */}
      <div className="bg-white p-6 rounded-2xl space-y-6">
        <h5 className="text-xl font-semibold text-[#0C58FF] mb-6">New Leads</h5>
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
                <tr key={row.id} className="border-t border-t-primary/50 ">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-3 text-sm whitespace-nowrap border-r border-r-primary/50 last:border-r-0"
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
        <h5 className="text-xl font-semibold text-[#C57A00] mb-6">Contacted</h5>
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
                <tr key={row.id} className="border-t border-t-primary/50 ">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-3 text-sm whitespace-nowrap border-r border-r-primary/50 last:border-r-0"
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
        <h5 className="text-xl font-semibold text-[#12C359] mb-6">Converted</h5>
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
                <tr key={row.id} className="border-t border-t-primary/50 ">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-3 text-sm whitespace-nowrap border-r border-r-primary/50 last:border-r-0"
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
