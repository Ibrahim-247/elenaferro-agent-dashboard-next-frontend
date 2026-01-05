import React from "react";
import { Button } from "../ui/button";
import { FaPlay } from "react-icons/fa6";

export default function PortalCard() {
  return (
    <div className="w-full bg-white min-w-68 rounded-xl overflow-hidden">
      <div className="bg-gray-400 w-full h-51 overflow-hidden flex items-center justify-center">
        <div className="size-10 rounded-full bg-black/50 flex items-center justify-center text-white text-xl">
          <FaPlay />
        </div>
      </div>
      <div className="p-3 space-y-4">
        <h4 className="text-sm font-medium line-clamp-2">
          Real Estate Compliance 2025
        </h4>
        <Button className="w-full bg-transparent border text-primary hover:bg-gray-100">
          Play
        </Button>
      </div>
    </div>
  );
}
