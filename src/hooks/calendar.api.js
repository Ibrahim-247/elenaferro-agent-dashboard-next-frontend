import { useQueryClient } from "@tanstack/react-query";
import useApiMutation from "./useApiMutation";
import { toast } from "sonner";

// appointment list
export const useAppointmentList = () => {
  return useApiMutation({
    key: "appointment_list",
    method: "get",
    isPrivate: true,
    endpoint: "/agent/appointment/list",
    onError: (error) => {
      console.error("Appointment list error", error);
    },
  });
};

// create appointment
export const useCreateAppointment = () => {
  const queryClient = useQueryClient();
  return useApiMutation({
    key: "create_appointment",
    method: "post",
    isPrivate: true,
    endpoint: "/agent/appointment/create",
    onSuccess: () => {
      queryClient.invalidateQueries(["appointment_list"]);
      toast.success("Appointment created successfully");
    },
    onError: (error) => {
      console.error("Create appointment error", error);
      toast.error(error?.response?.data?.message || "Failed to create appointment");
    },
  });
};

// update appointment
export const useUpdateAppointment = (id) => {
  const queryClient = useQueryClient();
  return useApiMutation({
    key: ["update_appointment", id],
    method: "post",
    isPrivate: true,
    endpoint: `/agent/appointment/update/${id}`,
    onSuccess: () => {
      queryClient.invalidateQueries(["appointment_list"]);
      toast.success("Appointment updated successfully");
    },
    onError: (error) => {
      console.error("Update appointment error", error);
      toast.error(error?.response?.data?.message || "Failed to update appointment");
    },
  });
};

// delete appointment
export const useDeleteAppointment = (id) => {
  const queryClient = useQueryClient();
  return useApiMutation({
    key: ["delete_appointment", id],
    method: "delete",
    isPrivate: true,
    endpoint: `/agent/appointment/delete/${id}`,
    onSuccess: () => {
      queryClient.invalidateQueries(["appointment_list"]);
      toast.success("Appointment deleted successfully");
    },
    onError: (error) => {
      console.error("Delete appointment error", error);
      toast.error(error?.response?.data?.message || "Failed to delete appointment");
    },
  });
};

// create task
export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useApiMutation({
    key: "create_task",
    method: "post",
    isPrivate: true,
    endpoint: "/agent/task/create",
    onSuccess: () => {
      queryClient.invalidateQueries(["task_list"]);
      toast.success("Task created successfully");
    },
    onError: (error) => {
      console.error("Create task error", error);
      toast.error(error?.response?.data?.message || "Failed to create task");
    },
  });
};

// update task
export const useUpdateTask = (id) => {
  const queryClient = useQueryClient();
  return useApiMutation({
    key: ["update_task", id],
    method: "post",
    isPrivate: true,
    endpoint: `/agent/task/update/${id}`,
    onSuccess: () => {
      queryClient.invalidateQueries(["task_list"]);
      toast.success("Task updated successfully");
    },
    onError: (error) => {
      console.error("Update task error", error);
      toast.error(error?.response?.data?.message || "Failed to update task");
    },
  });
};
