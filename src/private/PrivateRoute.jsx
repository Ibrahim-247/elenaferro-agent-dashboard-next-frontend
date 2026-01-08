"use client";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function PrivateRoute({ children }) {
  const token = useSelector((state) => state.auth.token);
  const router = useRouter();

  if (token) {
    return children;
  }

  return router.push("/auth/login");
}
