"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ProfileInfo from "./ProfileInfo";
import License from "./License";
import ChangePassword from "./ChangePassword";

export default function SettingWraper() {
  const profileForm = useForm({
    defaultValues: {
      name: "Ayana Mera",
      phone: "+1 (555) 123-4567",
    },
  });

  /* ================= PASSWORD FORM ================= */
  const passwordForm = useForm();

  /* ================= AVATAR ================= */

  const [showPassword, setShowPassword] = useState(false);

  /* ================= HANDLERS ================= */
  const onProfileSubmit = (data) => {
    console.log("Profile Updated:", data);
  };

  const onPasswordSubmit = (data) => {
    if (data.newPassword !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("Password Updated:", data);
  };

  return (
    <div className="space-y-4">
      <ProfileInfo />
      <License />
      <ChangePassword />
    </div>
  );
}
