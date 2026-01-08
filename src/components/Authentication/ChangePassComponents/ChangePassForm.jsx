"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import google from "../../../assets/google.png";
import Image from "next/image";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/lib/validators/loginSchema";
import { registerSchema } from "@/lib/validators/registerSchema";

export default function ChangePassForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //   hook form with zod validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      remember: false,
    },
  });

  const onSubmit = (data) => {
    console.log("Login Data:", data);
  };
  return (
    <div className="flex flex-col items-center justify-center my-10">
      <h4 className="text-4xl font-semibold mb-8">Change your password</h4>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
        {/* Password */}
        <div className="space-y-2">
          <h5 className="text-lg font-medium">Password</h5>

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="bg-[#F5F6F7] py-6 pr-12"
              {...register("password")}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showPassword ? (
                <EyeOff className="size-5" />
              ) : (
                <Eye className="size-5" />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
        {/* Confirm Password */}
        <div className="space-y-2">
          <h5 className="text-lg font-medium">Confirm Password</h5>

          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="bg-[#F5F6F7] py-6 pr-12"
              {...register("confirm_password")}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showConfirmPassword ? (
                <EyeOff className="size-5" />
              ) : (
                <Eye className="size-5" />
              )}
            </button>
          </div>

          {errors.confirm_password && (
            <p className="text-sm text-red-500">
              {errors.confirm_password.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full rounded-full bg-secondary hover:bg-secondary/90 text-base h-11 flex gap-2"
        >
          Reset Password
        </Button>
      </form>
    </div>
  );
}
