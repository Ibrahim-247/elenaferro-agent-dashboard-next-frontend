"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Trash2, Upload } from "lucide-react";
import { Input } from "../ui/input";
import dummy from "../../assets/avatar.png";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUpdateProfile } from "@/hooks/auth.api";
import { Spinner } from "../ui/spinner";

export default function ProfileInfo({ userdata }) {
  const [avatar, setAvatar] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  // profile update hook
  const profileUpdateMutation = useUpdateProfile();

  // hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm();

  useEffect(() => {
    reset({ ...userdata });
  }, [userdata]);

  useEffect(() => {
    if (userdata?.avatar) {
      setAvatar(userdata.avatar);
    }
  }, [userdata]);

  const handleAvatarUpload = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.info("Only image files are allowed");
      return;
    }
    setAvatarFile(file);
    setAvatar(URL.createObjectURL(file));
  };

  const onSubmit = (data) => {
    profileUpdateMutation?.mutate({
      name: data?.name,
      phone: data?.phone,
      avatar: avatarFile,
    });
  };

  return (
    <div>
      <section className="bg-white rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-6">Profile Information</h2>
        <div className="space-y-3.5">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <Image
              src={avatar ?? dummy}
              alt="avatar"
              width={80}
              height={80}
              className="w-20 h-20 rounded-full object-cover border"
            />

            <div className="flex items-center gap-4">
              <label className="cursor-pointer">
                <div
                  variant="outline"
                  className="flex items-center gap-2 text-sm border px-3 py-2 font-normal hover:bg-gray-50 rounded-md"
                >
                  <Upload size={16} />
                  {avatarFile ? "Replace Photo" : "Upload Photo"}
                </div>
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) =>
                    e.target.files && handleAvatarUpload(e.target.files[0])
                  }
                />
              </label>
              {avatarFile && (
                <button
                  type="button"
                  onClick={() => {
                    setAvatar(null);
                    setAvatarFile(null);
                  }}
                  className="text-sm text-red-500 flex items-center gap-1"
                >
                  <Trash2 size={14} />
                  Remove
                </button>
              )}
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Name */}
            <div className="md:col-span-2 space-y-1.5">
              <p className="text-sm font-medium">Name</p>
              <Input
                className="input"
                placeholder="Your name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="md:col-span-2 space-y-1.5">
              <p className="text-sm font-medium">Email</p>
              <Input
                disabled
                className="input bg-gray-50"
                {...register("email")}
              />
              <p className="text-xs text-gray-400 mt-1">
                Your email cannot be changed for security reasons.
              </p>
            </div>

            {/* Phone */}
            <div className="md:col-span-2 space-y-1.5">
              <p className="text-sm font-medium">Phone Number</p>
              <Input
                className="input"
                placeholder="Your number"
                {...register("phone")}
              />
            </div>

            {/* Actions */}
            <div className="md:col-span-2 flex justify-end gap-3 mt-4">
              {(isDirty || avatarFile) && (
                <Button
                  disabled={profileUpdateMutation?.isPending}
                  type="submit"
                  className="bg-secondary text-white hover:bg-secondary/90"
                >
                  Save Changes {profileUpdateMutation?.isPending && <Spinner />}
                </Button>
              )}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
