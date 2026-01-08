import { toast } from "sonner";
import useApiMutation from "./useApiMutation";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setAuth } from "@/redux/slices/authSlice";

// login api
export const useLogin = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  return useApiMutation({
    key: "login",
    method: "post",
    endpoint: "/login",
    onSuccess: (data, variables) => {
      const remember = variables?.remember || false;
      dispatch(
        setAuth({
          user: data?.data?.user,
          token: data?.data?.token?.original?.access_token,
          remember,
        })
      );
      router.push("/");
      console.log(data);
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
