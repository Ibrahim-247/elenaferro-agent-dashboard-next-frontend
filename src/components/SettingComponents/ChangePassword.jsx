"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
    reset,
  } = useForm();

  /* show/hide per field */
  const [show, setShow] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const newPassword = watch("newPassword");

  const onSubmit = (data) => {
    console.log("Password Change Data:", data);
    reset();
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
              type={show.currentPassword ? "text" : "password"}
              placeholder="Enter current password"
              {...register("currentPassword", {
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
                  currentPassword: !s.currentPassword,
                }))
              }
              className="absolute right-3 top-2.5 text-gray-400"
            >
              {show.currentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {errors.currentPassword && (
            <p className="text-xs text-red-500">
              {errors.currentPassword.message}
            </p>
          )}
        </div>

        {/* ================= NEW PASSWORD ================= */}
        <div className="space-y-2">
          <label className="text-sm font-medium block">New Password</label>

          <div className="relative">
            <Input
              type={show.newPassword ? "text" : "password"}
              placeholder="Enter new password"
              {...register("newPassword", {
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
                  newPassword: !s.newPassword,
                }))
              }
              className="absolute right-3 top-2.5 text-gray-400"
            >
              {show.newPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {errors.newPassword && (
            <p className="text-xs text-red-500">{errors.newPassword.message}</p>
          )}
        </div>

        {/* ================= CONFIRM PASSWORD ================= */}
        <div className="space-y-2">
          <label className="text-sm font-medium block">Confirm Password</label>

          <div className="relative">
            <Input
              type={show.confirmPassword ? "text" : "password"}
              placeholder="Confirm new password"
              {...register("confirmPassword", {
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
                  confirmPassword: !s.confirmPassword,
                }))
              }
              className="absolute right-3 top-2.5 text-gray-400"
            >
              {show.confirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {errors.confirmPassword && (
            <p className="text-xs text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* ================= ACTIONS ================= */}
        {isDirty && (
          <div className="md:col-span-2 flex justify-end gap-3 mt-4">
            <Button
              type="submit"
              className="bg-secondary text-white hover:bg-secondary/90"
            >
              Save Changes
            </Button>
          </div>
        )}
      </form>
    </section>
  );
}
