import React from "react";
import StatsCard from "../common/StatsCard";
import {
  CircleDollarSign,
  File,
  FileText,
  FolderMinus,
  ListChecks,
  Users,
} from "lucide-react";
import { Image } from "lucide-react";

export default function PublicFolderStats() {
  // stats data
  const stats = [
    {
      name: "Templates",
      value: "8",
      icon: <FileText />,
      bg: "#EFF6FF",
      color: "#3853FF",
    },
    {
      name: "Brand Assets",
      value: "8",
      icon: <Image />,
      bg: "#F0FDF4",
      color: "#2FA75F",
    },
    {
      name: "Guidelines",
      value: "8",
      icon: <File />,
      bg: "#FAF5FF",
      color: "#A633FA",
    },
    {
      name: "Marketing Materials",
      value: "8",
      icon: <FolderMinus />,
      bg: "#FFF7ED",
      color: "#F7763D",
    },
  ];
  return (
    <div className="grid grid-cols-4 gap-5">
      {stats?.map((item, index) => (
        <StatsCard item={item} key={index} />
      ))}
    </div>
  );
}
