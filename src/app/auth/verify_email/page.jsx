import EmailVerifyForm from "@/components/Authentication/EmailVerifyComponents/EmailVerifyForm";
import { Spinner } from "@/components/ui/spinner";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col items-center justify-center">
          <Spinner className="size-10" />
        </div>
      }
    >
      <div className="max-w-150 w-full mx-auto min-h-screen flex flex-col items-center justify-center">
        <EmailVerifyForm />
      </div>
    </Suspense>
  );
}
