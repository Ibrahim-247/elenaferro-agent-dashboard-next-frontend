import { toast } from "sonner";
import useApiMutation from "./useApiMutation";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setAuth } from "@/redux/slices/authSlice";
import { useQueryClient } from "@tanstack/react-query";

// login api
export const useLogin = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  return useApiMutation({
    key: "login",
    method: "post",
    endpoint: "/login",
    onSuccess: (data, variables) => {
      if (data?.data?.is_subscribed) {
        const remember = variables?.remember || false;
        dispatch(
          setAuth({
            user: data?.data?.user,
            token: data?.data?.token?.original?.access_token,
            remember,
          }),
        );
        router.push("/");
      } else {
        router.push("https://elenaferro-agent.vercel.app/pricing");
        toast.info(
          "You must have an active subscription to access the dashboard.",
        );
      }
    },
    onError: (error) => {
      if (error?.code === "ERR_NETWORK") {
        toast.error("Please check your network connection");
      } else {
        toast.error(error?.response?.data?.message || "Something went wrong!");
      }

      console.error("Login error:", error);
    },
  });
};

// profile info
export const useProfileInfo = () => {
  return useApiMutation({
    key: "me",
    method: "get",
    isPrivate: true,
    endpoint: "/me",
    onError: (error) => {
      console.error("Error from profile info", error);
    },
  });
};

// profile update
export const useUpdateProfile = () => {
  const quryClient = useQueryClient();
  return useApiMutation({
    key: "profile_update",
    isPrivate: true,
    endpoint: "/agent/update",
    headers: { "Content-Type": "multipart/form-data" },
    onSuccess: () => {
      toast.success("Profile updated successfully");
      quryClient.invalidateQueries(["me"]);
    },
    onError: (error) => {
      console.error("Error from profile update", error);
    },
  });
};

// change password
export const usePasswordChange = () => {
  return useApiMutation({
    key: "password_change",
    isPrivate: true,
    endpoint: "/password/change",
    onSuccess: () => {
      toast.success("Password changed successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      console.error("Error from password changed", error);
    },
  });
};
