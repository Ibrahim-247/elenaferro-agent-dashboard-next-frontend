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

// change password
export const useForgotPassword = () => {
  const router = useRouter();
  return useApiMutation({
    key: "send_code",
    isPrivate: true,
    endpoint: "/forgot-password",
    onSuccess: (data, variables) => {
      console.log(data);

      router.push(`verify_email?email=${variables.email}`);
      toast.success("Password reset code sent to your email");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      console.error("Error from password changed", error);
    },
  });
};

// verify forgot password code
export const useVerifyForgotPasswordCode = () => {
  const router = useRouter();
  return useApiMutation({
    key: "verify-otp-password",
    isPrivate: true,
    endpoint: "/verify-otp-password",
    onSuccess: () => {
      router.push("password_change");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      console.error("Error from password changed", error);
    },
  });
};
