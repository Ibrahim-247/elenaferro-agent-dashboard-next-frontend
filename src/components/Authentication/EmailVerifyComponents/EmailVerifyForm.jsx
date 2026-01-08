"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function EmailVerifyForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = (data) => {
    console.log("OTP:", data.otp);
  };

  return (
    <div className="flex flex-col items-center justify-center my-10 text-center">
      <h4 className="text-4xl font-semibold mb-8">Verify Code</h4>
      <div className="text-lg font-normal max-w-150 mb-6">
        Enter the verification code we send you on:{" "}
        <span>elenaferro******@gmail.com</span>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full space-y-6 flex flex-col items-center"
      >
        {/* OTP */}
        <Controller
          name="otp"
          control={control}
          rules={{
            required: "OTP is required",
            minLength: {
              value: 4,
              message: "OTP must be 4 digits",
            },
          }}
          render={({ field }) => (
            <InputOTP
              {...field}
              maxLength={4}
              inputMode="numeric"
              pattern="[0-9]*"
            >
              <InputOTPGroup className="gap-3">
                {[...Array(4)].map((_, index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className="shadow-none border rounded-lg size-14 text-xl"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          )}
        />

        {errors.otp && (
          <p className="text-sm text-red-500 text-center">
            {errors.otp.message}
          </p>
        )}

        {/* Submit */}
        <Button
          type="submit"
          className="w-full rounded-full bg-secondary hover:bg-secondary/90 text-base h-11 flex gap-2"
        >
          Verify <ArrowRight className="size-5" />
        </Button>
      </form>

      <div className="text-lg font-normal text-center text-[#878787] mt-8">
        Didn’t receive code?{" "}
        <button className="text-secondary underline">Resend</button>
      </div>
    </div>
  );
}
