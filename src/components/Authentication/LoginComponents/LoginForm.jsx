"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ArrowRight, CircleAlert, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import google from "../../../assets/google.png";
import Image from "next/image";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/lib/validators/loginSchema";
import { useLogin } from "@/hooks/auth.api";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  //   hook form with zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      remember: false,
    },
  });

  // login hooks
  const login = useLogin();

  const onSubmit = (data) => {
    login?.mutate(data);
  };

  console.log(login?.error);

  return (
    <div className="flex flex-col items-center justify-center my-10">
      <h4 className="text-4xl font-semibold mb-8">Login to continue</h4>
      {login?.error && (
        <Alert className="bg-yellow-50 border-yellow-500 mb-5">
          <CircleAlert />
          <AlertTitle>{login?.error?.message}</AlertTitle>
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
        {/* Email */}
        <div className="space-y-2">
          <h5 className="text-lg font-medium">Email Address</h5>
          <Input
            type="email"
            placeholder="Enter your email"
            className="bg-[#F5F6F7] py-6"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

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

          <Link
            href="forgot_password"
            className="text-base font-medium text-[#D37A78] underline flex justify-end"
          >
            Forgot Password
          </Link>
        </div>

        {/* Remember me */}
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox
            checked={watch("remember")}
            onCheckedChange={(val) => setValue("remember", Boolean(val))}
            className="data-[state=checked]:bg-secondary data-[state=checked]:border-transparent"
          />
          <span>Remember me</span>
        </label>

        {/* Submit */}
        <Button
          type="submit"
          disabled={login?.isPending}
          className="w-full rounded-full bg-secondary hover:bg-secondary/90 text-base h-11 flex gap-2"
        >
          Log in
          {login?.isPending ? <Spinner /> : <ArrowRight className="size-5" />}
        </Button>

        {/* Signup */}
        <div className="text-lg text-center space-x-2">
          <span>Don't have an account?</span>
          <Link
            href="https://elenaferro-agent.vercel.app/register"
            className="text-secondary underline"
          >
            Create Account
          </Link>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="bg-[#C1C4CC] h-px flex-1" />
          <span className="text-base font-semibold">Or</span>
          <div className="bg-[#C1C4CC] h-px flex-1" />
        </div>

        {/* Google Login */}
        <Button
          type="button"
          className="bg-transparent hover:bg-gray-50 border rounded-full text-primary w-full h-11 text-base flex gap-2"
        >
          <Image src={google} alt="google" className="w-5" />
          Continue with Google
        </Button>
      </form>
    </div>
  );
}
