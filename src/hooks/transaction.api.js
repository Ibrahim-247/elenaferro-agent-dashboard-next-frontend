import { useQueryClient } from "@tanstack/react-query";
import useApiMutation from "./useApiMutation";
import { toast } from "sonner";

// transaction list
export const useTransactionlist = () => {
  return useApiMutation({
    key: "transaction_list",
    method: "get",
    isPrivate: true,
    endpoint: "/agent/transaction/list",
    onError: (error) => {
      console.error("Transaction list", error);
    },
  });
};

// unlinked documents list
export const useDocumentUnlinkedlist = (id) => {
  return useApiMutation({
    key: "unlinked_document_list",
    method: "get",
    isPrivate: true,
    params: { id },
    enabled: !!id,
    endpoint: `agent/transaction/${id}/document/unlinked`,
    onError: (error) => {
      console.error("Unlinked document list", error);
    },
  });
};

// linked documents list
export const useDocumentLinkedlist = (id) => {
  return useApiMutation({
    key: "linked_document_list",
    method: "get",
    isPrivate: true,
    params: { id },
    enabled: !!id,
    endpoint: `/agent/transaction/${id}/document/linked`,
    onError: (error) => {
      console.error("Linked document list", error);
    },
  });
};

// linked documents
export const useDocumentLinked = (id) => {
  const queryClient = useQueryClient();
  return useApiMutation({
    key: "linked_document",
    isPrivate: true,
    enabled: !!id,
    endpoint: `/agent/transaction/${id}/document/link`,

    onSuccess: (data) => {
      queryClient.invalidateQueries(["linked_document_list"]);
      toast.success("Documents linked successfully");
    },
    onError: (error) => {
      console.error("Linked document", error);
    },
  });
};
