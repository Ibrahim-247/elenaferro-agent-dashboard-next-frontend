import EmailVerifyForm from "@/components/Authentication/EmailVerifyComponents/EmailVerifyForm";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense>
      <EmailVerifyForm />
    </Suspense>
  );
}
