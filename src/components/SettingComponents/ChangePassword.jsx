"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { usePasswordChange } from "@/hooks/auth.api";
import { Spinner } from "../ui/spinner";

export default function ChangePassword() {
  // change password hook
  const passwordChangeMutation = usePasswordChange();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
    reset,
  } = useForm();

  /* show/hide per field */
  const [show, setShow] = useState({
    current_password: false,
    password: false,
    password_confirmation: false,
  });

  const newPassword = watch("password");

  const onSubmit = (data) => {
    passwordChangeMutation?.mutate(data);
  };

  return (
    <section className="bg-white rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-6">Change your Password</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* ================= CURRENT PASSWORD ================= */}
        <div className="space-y-2">
          <label className="text-sm font-medium block">Current Password</label>

          <div className="relative">
            <Input
              type={show.current_password ? "text" : "password"}
              placeholder="Enter current password"
              {...register("current_password", {
                required: "Current password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />

            <button
              type="button"
              onClick={() =>
                setShow((s) => ({
                  ...s,
                  current_password: !s.current_password,
                }))
              }
              className="absolute right-3 top-2.5 text-gray-400"
            >
              {show.current_password ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {errors.current_password && (
            <p className="text-xs text-red-500">
              {errors.current_password.message}
            </p>
          )}
        </div>

        {/* ================= NEW PASSWORD ================= */}
        <div className="space-y-2">
          <label className="text-sm font-medium block">New Password</label>

          <div className="relative">
            <Input
              type={show.password ? "text" : "password"}
              placeholder="Enter new password"
              {...register("password", {
                required: "New password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />

            <button
              type="button"
              onClick={() =>
                setShow((s) => ({
                  ...s,
                  password: !s.password,
                }))
              }
              className="absolute right-3 top-2.5 text-gray-400"
            >
              {show.password ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* ================= CONFIRM PASSWORD ================= */}
        <div className="space-y-2">
          <label className="text-sm font-medium block">Confirm Password</label>

          <div className="relative">
            <Input
              type={show.password_confirmation ? "text" : "password"}
              placeholder="Confirm new password"
              {...register("password_confirmation", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === newPassword || "Passwords do not match",
              })}
            />

            <button
              type="button"
              onClick={() =>
                setShow((s) => ({
                  ...s,
                  password_confirmation: !s.password_confirmation,
                }))
              }
              className="absolute right-3 top-2.5 text-gray-400"
            >
              {show.password_confirmation ? (
                <EyeOff size={16} />
              ) : (
                <Eye size={16} />
              )}
            </button>
          </div>

          {errors.password_confirmation && (
            <p className="text-xs text-red-500">
              {errors.password_confirmation.message}
            </p>
          )}
        </div>

        {/* ================= ACTIONS ================= */}
        {isDirty && (
          <div className="md:col-span-2 flex justify-end gap-3 mt-4">
            <Button
              disabled={passwordChangeMutation?.isPending}
              type="submit"
              className="bg-secondary text-white hover:bg-secondary/90"
            >
              Save Changes {passwordChangeMutation?.isPending && <Spinner />}
            </Button>
          </div>
        )}
      </form>
    </section>
  );
}
