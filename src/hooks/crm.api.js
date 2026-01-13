import useApiMutation from "./useApiMutation";

// lead list
export const useLeadlist = () => {
  return useApiMutation({
    key: "lead_list",
    method: "get",
    isPrivate: true,
    endpoint: "/agent/lead/list",
    onError: (error) => {
      console.error("Lead list", error);
    },
  });
};
