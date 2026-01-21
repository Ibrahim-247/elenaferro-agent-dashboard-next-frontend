import useApiMutation from "./useApiMutation";

// my task list
export const useTasklist = () => {
  return useApiMutation({
    key: "task_list",
    method: "get",
    isPrivate: true,
    endpoint: "/agent/task/list",
    onError: (error) => {
      console.error("My task list", error);
    },
  });
};

// dashboard stats
export const useDashboardStats = () => {
  return useApiMutation({
    key: "dashboard_stats",
    method: "get",
    isPrivate: true,
    endpoint: "/agent/dashboard",
    onError: (error) => {
      console.error("Dashboard stats data", error);
    },
  });
};
