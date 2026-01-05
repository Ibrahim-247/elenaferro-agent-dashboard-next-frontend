"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import NewTaskModal from "./NewTaskModal";

export default function PerformanceTaskHeader() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-5 bg-white p-6 rounded-2xl">
        <div className="relative w-full">
          <Input
            placeholder="Search documents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-12 pl-10"
          />
          <Search className="absolute top-1/2 -translate-y-1/2 left-2 text-gray-500" />
        </div>

        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="md:w-40 h-12!">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Priority</SelectLabel>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="Buyer">Buyer</SelectItem>
              <SelectItem value="Seller">Seller</SelectItem>
            </SelectGroup>
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
        <NewTaskModal />
      </div>
    </div>
  );
}
