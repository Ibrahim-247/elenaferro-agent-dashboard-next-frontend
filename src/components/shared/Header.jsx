"use client";
import { Bell } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import avatar from "../../assets/avatar.png";

export default function Header() {
  const [greeting, setGreeting] = useState("");
  const user = useSelector((state) => state.auth.user);

  // greetings
  const updateGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) setGreeting("Good Morning");
    else if (hour >= 12 && hour < 17) setGreeting("Good Afternoon");
    else if (hour >= 17 && hour < 21) setGreeting("Good Evening");
    else setGreeting("Good Night");
  };

  useEffect(() => {
    updateGreeting();
    const interval = setInterval(updateGreeting, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-23 w-full flex items-center justify-between px-6">
      <h4 className="text-3xl font-semibold">
        {greeting}, {user?.full_name}
      </h4>
      <div className="flex items-center gap-5">
        <div className="size-12 rounded-lg bg-gray-100 border-gray-300 border flex items-center justify-center">
          <Bell />
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-gray-200 rounded-full overflow-hidden size-12">
            <Image
              src={avatar}
              alt={user?.full_name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h5 className="text-lg font-medium">{user?.full_name}</h5>
            <p className="text-sm font-normal">Agent</p>
          </div>
        </div>
      </div>
    </div>
  );
}
