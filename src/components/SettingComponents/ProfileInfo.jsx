"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Trash2, Upload } from "lucide-react";
import { Input } from "../ui/input";
import dummy from "../../assets/avatar.png";
import Image from "next/image";

export default function ProfileInfo() {
  const [avatar, setAvatar] = useState(null);

  const handleAvatarUpload = (file) => {
    setAvatar(URL.createObjectURL(file));
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
              <label className="flex items-center gap-2 text-sm cursor-pointer text-primary">
                <Button variant="outline" className="flex items-center">
                  <Upload size={16} />
                  Upload Photo
                </Button>
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) =>
                    e.target.files && handleAvatarUpload(e.target.files[0])
                  }
                />
              </label>

              <button
                onClick={() => setAvatar(null)}
                className="text-sm text-red-500 flex items-center gap-1"
              >
                <Trash2 size={14} />
                Remove
              </button>
            </div>
          </div>

          {/* Form */}
          <form className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2 space-y-1.5">
              <p className="text-sm font-medium">Name</p>
              <Input className="input" placeholder="Your name" />
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <p className="text-sm font-medium">Email</p>
              <Input
                disabled
                placeholder="Your email"
                className="input bg-gray-50"
              />
              <p className="text-xs text-gray-400 mt-1">
                Your email cannot be changed for security reasons.
              </p>
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <p className="text-sm font-medium">Phone Number</p>
              <Input className="input" placeholder="Your number" />
            </div>

            <div className="md:col-span-2 flex justify-end gap-3 mt-4">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-secondary text-white hover:bg-secondary/90"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
