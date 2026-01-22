import useApiMutation from "./useApiMutation";

// docusign connect
export const useConnectDocusign = () => {
  return useApiMutation({
    key: "connect_docusign",
    isPrivate: true,
    endpoint: "/agent/docusign/connect",

    onSuccess: (data) => {
      window.location.replace(data?.data?.auth_url, "_blank");
    },
    onError: (error) => {
      console.error("Error from docusign connect", error);
    },
  });
};

// docusign connect status
export const useDocusignStatus = () => {
  return useApiMutation({
    key: "connect_docusign_status",
    isPrivate: true,
    method: "get",
    endpoint: "/agent/docusign/status",
    onError: (error) => {
      console.error("Error from docusign connect status", error);
    },
  });
};
