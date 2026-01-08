"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function ForgotPassForm() {
  const router = useRouter();

  // hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login Data:", data);
    router.push("verify_email");
  };

  return (
    <div className="flex flex-col items-center justify-center my-10">
      <h4 className="text-4xl font-semibold mb-8">Forgot Your Password</h4>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
        {/* Email */}
        <div className="space-y-2">
          <h5 className="text-lg font-medium">Email Address</h5>
          <Input
            type="email"
            placeholder="Enter your email"
            className="bg-[#F5F6F7] py-6"
            {...register("email", {
              required: "Please enter a valid email",
            })}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        {/* Submit */}
        <Button
          type="submit"
          className="w-full rounded-full bg-secondary hover:bg-secondary/90 text-base h-11 flex gap-2"
        >
          Send OTP <ArrowRight className="size-5" />
        </Button>
      </form>
    </div>
  );
}
