import { useQueryClient } from "@tanstack/react-query";
import useApiMutation from "./useApiMutation";

// my folder list
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

// document details
export const useDocumentDetails = (id) => {
  return useApiMutation({
    key: "document_details",
    method: "get",
    params: { id },
    isPrivate: true,
    endpoint: `/agent/document/list/document_folder/${id}`,
    onError: (error) => {
      console.error("Document details", error);
    },
    enabled: !!id,
  });
};

// folder update
export const useUpdateFolder = (id) => {
  return useApiMutation({
    key: "folder_update",
    method: "post",
    isPrivate: true,
    endpoint: `/agent/document_folder/update/${id}`,
    onError: (error) => {
      console.error("Folder update", error);
    },
  });
};

// folder delete
export const useDeleteFolder = (id) => {
  return useApiMutation({
    key: "folder_delete",
    method: "delete",
    isPrivate: true,
    endpoint: `/agent/document_folder/delete/${id}`,
    onError: (error) => {
      console.error("Folder delete", error);
    },
  });
};

// document update (rename)
export const useUpdateDocument = (id) => {
  const queryClient = useQueryClient();
  return useApiMutation({
    key: "document_update",
    method: "post",
    isPrivate: true,
    endpoint: `/agent/document/rename/${id}`,
    onSuccess: () => {
      queryClient.invalidateQueries(["document_details"]);
    },
    onError: (error) => {
      console.error("Document update", error);
    },
  });
};

// document delete
export const useDeleteDocument = (id) => {
  const queryClient = useQueryClient();
  return useApiMutation({
    key: "document_delete",
    method: "delete",
    isPrivate: true,
    endpoint: `/agent/document/delete/${id}`,
    onSuccess: () => {
      queryClient.invalidateQueries(["document_details"]);
    },
    onError: (error) => {
      console.error("Document delete", error);
    },
  });
};
