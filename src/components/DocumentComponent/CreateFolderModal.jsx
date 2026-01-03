import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FolderPlus, X } from "lucide-react";

export default function CreateFolderModal() {
  return (
    <div>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button className="h-12 bg-secondary text-white hover:bg-secondary/90 px-5!">
              <FolderPlus className="size-5" /> Create New Folder
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[600px]! p-8 [&>button]:hidden">
            <DialogClose asChild>
              <div
                type="button"
                className="absolute right-4 top-4 size-8 flex items-center justify-center rounded-full border text-muted-foreground hover:bg-gray-100 hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </div>
            </DialogClose>
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold text-secondary font-cormorant">
                Create New Folder
              </DialogTitle>
            </DialogHeader>

            <div className="grid gap-2">
              <label className="text-[#404A60]">Folder Name</label>
              <Input
                name="name"
                placeholder="Enter Folder Name"
                className="h-10"
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="w-full shrink h-10">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="bg-secondary text-white hover:bg-secondary/90 w-full shrink h-10"
              >
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}
