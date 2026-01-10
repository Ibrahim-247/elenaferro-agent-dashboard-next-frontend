import useApiMutation from "./useApiMutation";

// training portal
export const usePortallist = () => {
  return useApiMutation({
    key: "portal_list",
    method: "get",
    isPrivate: true,
    endpoint: "/agent/video/list",
    onError: (error) => {
      console.error("My portal list", error);
    },
  });
};
