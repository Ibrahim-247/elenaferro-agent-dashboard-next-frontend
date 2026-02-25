import useApiMutation from "./useApiMutation";

// docusign connect
export const useConnectDocusign = () => {
  return useApiMutation({
    key: "connect_docusign",
    isPrivate: true,
    endpoint: "/agent/docusign/connect",
    onSuccess: (data) => {
      if (typeof window !== "undefined") {
        const authUrl = data?.data?.auth_url;
        if (authUrl) {
          window.open(authUrl, "_blank");
        }
      }
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
