import Image from "next/image";
import folderBg from "../../assets/folder_bg.png";
import FolderSvg from "../svg/FolderSvg";
import Link from "next/link";

export default function FolderCard({ item }) {
  return (
    <Link href={`/documents/${item?.id}`} className="w-full relative">
      <div className="absolute top-12 left-10">
        <FolderSvg className="" />
      </div>
      <Image
        src={folderBg}
        alt="folder"
        className="w-full h-full object-contain"
      />
      <div className="space-y-2 absolute bottom-10 left-10">
        <h4 className="text-xl font-semibold">{item?.name}</h4>
        <p className="text-[#1D1235]/50 text-lg font-normal">
          {item?.total_documents ?? 0} files,{" "}
          {item?.total_document_file_sizes ?? 0}
        </p>
      </div>
    </Link>
  );
}
