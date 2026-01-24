"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

export default function PublicFolderHeader({
  search,
  type,
  setSearch,
  setType,
}) {
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
          <Search className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-500" />
        </div>

        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="md:w-40 h-12!">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All Category</SelectItem>
              <SelectItem value="templates">Templates</SelectItem>
              <SelectItem value="brand_assets">Brand Assets</SelectItem>
              <SelectItem value="guidelines">Guidelines</SelectItem>
              <SelectItem value="marketing_materials">
                Marketing Materials
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
