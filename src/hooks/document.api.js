import { useQueryClient } from "@tanstack/react-query";
import useApiMutation from "./useApiMutation";

// my task list
export const useFolderlist = () => {
  return useApiMutation({
    key: "folder_list",
    method: "get",
    isPrivate: true,
    endpoint: "/agent/document_folder/list",
    onError: (error) => {
      console.error("My folder list", error);
    },
  });
};
