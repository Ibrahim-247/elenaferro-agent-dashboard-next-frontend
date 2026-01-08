import { useMutation, useQuery } from "@tanstack/react-query";
import axiosPrivate from "./axios/useAxiosPrivate";
import { axiosPublic } from "./axios/useAxiosPublic";

export default function useApiMutation({
  endpoint,
  method = "post",
  isPrivate = false,
  key,
  onSuccess,
  onError,
  params,
  headers,
  options,
  enabled = true,
}) {
  const axiosInstance = isPrivate ? axiosPrivate : axiosPublic;

  const mutation = useMutation({
    mutationKey: [key],
    mutationFn: async (data) => {
      const res = await axiosInstance[method](endpoint, data, {
        headers: headers,
      });
      return res?.data;
    },
    onSuccess,
    onError,
  });

  const query = useQuery({
    queryKey: [key, params],
    queryFn: async () => {
      const res = await axiosInstance.get(endpoint, { params });
      return res.data;
    },
    enabled: method === "get" ? Boolean(enabled) : false,
    staleTime: 10 * 1000,
    ...options,
  });

  return method === "get" ? query : mutation;
}
