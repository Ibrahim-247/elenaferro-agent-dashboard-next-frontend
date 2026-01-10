import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FaPlay } from "react-icons/fa";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function PortalCard({ item }) {
  return (
    <Dialog>
      {/* ===== CARD ===== */}
      <div className="w-full bg-white min-w-68 rounded-xl overflow-hidden">
        <DialogTrigger asChild>
          <div className="bg-gray-400 w-full h-51 relative overflow-hidden flex items-center justify-center cursor-pointer">
            <Image
              src={item?.thumbnail_image}
              alt={item?.title}
              width={270}
              height={160}
              className="w-full h-full aspect-video object-cover"
            />

            <div
              className="size-10 rounded-full bg-black/60 absolute inset-0 m-auto flex items-center justify-center
              text-white text-xl hover:scale-110 transition"
            >
              <FaPlay />
            </div>
          </div>
        </DialogTrigger>

        <div className="p-3 space-y-4">
          <h4 className="text-sm font-medium line-clamp-2">{item?.title}</h4>

          <DialogTrigger asChild>
            <Button variant="outline" className="w-full text-primary border">
              Play
            </Button>
          </DialogTrigger>
        </div>
      </div>

      {/* ===== VIDEO MODAL ===== */}
      <DialogContent className="max-w-4xl p-0 bg-black overflow-hidden [&>button]:hidden">
        <div className="relative w-full aspect-video border-white border-2 overflow-hidden">
          <video
            src={item?.video}
            controls
            autoPlay
            className="w-full h-full object-cover overflow-hidden"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
