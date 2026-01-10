"use client";
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
import useApiMutation from "@/hooks/useApiMutation";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { Spinner } from "../ui/spinner";
import { useState } from "react";
import { logout } from "@/redux/slices/authSlice";
import { toast } from "sonner";

export default function LogoutModal() {
  const [open, setopen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  // logout mutation
  const logoutMutation = useApiMutation({
    key: "logout",
    endpoint: "/logout",
    isPrivate: true,
    onSuccess: () => {
      dispatch(logout());
      setopen(false);
      router.push("/auth/login");
      toast.success("Successfully logged out");
    },
    onError: (error) => {
      console.error("Logout error:", error);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger asChild>
        <div className="px-11">
          <Button
            className={`rounded-md shrink w-full bg-transparent text-black border hover:bg-gray-50`}
          >
            <span>
              <LogOut className="text-red-500" />
            </span>
            <span>Logout</span>
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106">
        <DialogHeader>
          <DialogTitle>Confirm logout</DialogTitle>
          <DialogDescription>
            For your security, please confirm that you want to log out of your
            account.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => setopen(false)}
              disabled={logoutMutation?.isPending}
              variant="outline"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={() => logoutMutation?.mutate()}
            disabled={logoutMutation?.isPending}
            type="submit"
            className="bg-red-500 hover:bg-red-400"
          >
            Log out {logoutMutation?.isPending && <Spinner />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
