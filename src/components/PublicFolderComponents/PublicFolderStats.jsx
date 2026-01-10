"use client";
import StatsCard from "../common/StatsCard";
import { File, FileText, FolderMinus } from "lucide-react";
import { Image } from "lucide-react";
import { useResourceslist } from "@/hooks/resources.api";

export default function PublicFolderStats() {
  const { data } = useResourceslist();
  const statsData = data?.data;

  // stats data
  const stats = [
    {
      name: "Templates",
      value: statsData?.templates || 0,
      icon: <FileText />,
      bg: "#EFF6FF",
      color: "#3853FF",
    },
    {
      name: "Brand Assets",
      value: statsData?.brand_assets || 0,
      icon: <Image />,
      bg: "#F0FDF4",
      color: "#2FA75F",
    },
    {
      name: "Guidelines",
      value: statsData?.guidelines || 0,
      icon: <File />,
      bg: "#FAF5FF",
      color: "#A633FA",
    },
    {
      name: "Marketing Materials",
      value: statsData?.marketing_materials || 0,
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
