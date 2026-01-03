import Image from "next/image";
import folderBg from "../../assets/folder_bg.png";
import FolderSvg from "../svg/FolderSvg";
import Link from "next/link";

export default function FolderCard() {
  return (
    <Link href="/documents/454" className="w-full h-86 relative">
      <div className="absolute top-12 left-15">
        <FolderSvg />
      </div>
      <Image
        src={folderBg}
        alt="folder"
        className="w-full h-full object-cover"
      />
      <div className="space-y-2 absolute bottom-10 left-10">
        <h4 className="text-2xl font-semibold">Personal Documents</h4>
        <p className="text-[#1D1235]/50 text-xl font-normal">
          12 files, 502 MB
        </p>
      </div>
    </Link>
  );
}
