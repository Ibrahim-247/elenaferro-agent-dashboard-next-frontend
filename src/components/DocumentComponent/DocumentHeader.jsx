"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function DocumentHeader({ setSearch, search }) {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-5 bg-white p-6 rounded-2xl">
        <div className="relative w-full">
          <Input
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-12 pl-10"
          />
          <Search className="absolute top-1/2 -translate-y-1/2 left-2 text-gray-500" />
        </div>
      </div>
    </div>
  );
}
