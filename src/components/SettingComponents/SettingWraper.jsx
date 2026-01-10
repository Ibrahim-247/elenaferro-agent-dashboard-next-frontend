"use client";
import ProfileInfo from "./ProfileInfo";
import License from "./License";
import ChangePassword from "./ChangePassword";
import { useProfileInfo } from "@/hooks/auth.api";

export default function SettingWraper() {
  // profile info
  const { data } = useProfileInfo();
  const userdata = data?.data?.user;

  return (
    <div className="space-y-4">
      <ProfileInfo userdata={userdata} />
      <License userdata={userdata} />
      <ChangePassword />
    </div>
  );
}
