import { useQueryClient } from "@tanstack/react-query";
import useApiMutation from "./useApiMutation";
import { toast } from "sonner";

// notification list
export const useNotificationlist = () => {
  return useApiMutation({
    key: "notification_list",
    method: "get",
    isPrivate: true,
    endpoint: "/agent/notification/list",
    onError: (error) => {
      console.error("Notification list", error);
    },
  });
};

// mark all as read
export const useAllNotificationRead = () => {
  const quryClient = useQueryClient();
  return useApiMutation({
    key: "read_all_notification",
    isPrivate: true,
    endpoint: "/agent/notification/read-all",
    onSuccess: () => {
      toast.success("All notifications marked as read");
      quryClient.invalidateQueries(["notification_list"]);
    },
    onError: (error) => {
      console.error("Notification list", error);
    },
  });
};
