import useApiMutation from "./useApiMutation";

export const useResourceslist = () => {
  return useApiMutation({
    key: "resources_list",
    method: "get",
    isPrivate: true,
    endpoint: "/agent/resource/list",
    onError: (error) => {
      console.error("My resource list", error);
    },
  });
};
