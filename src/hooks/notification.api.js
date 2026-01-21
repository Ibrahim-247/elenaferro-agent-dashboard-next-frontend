import useApiMutation from "./useApiMutation";

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
