"use client";
import { CheckCircle2, ArrowLeft, FileText, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DocumentSuccessPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div
        className={`max-w-md w-full bg-white rounded-3xl shadow-md p-8 text-center transition-all duration-700 transform ${
          isMounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        {/* Success Icon Animation Container */}
        <div className="relative mb-8 flex justify-center">
          <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-20 size-24 mx-auto"></div>
          <div className="relative bg-green-50 rounded-full p-6 text-green-600 size-24 flex items-center justify-center">
            <CheckCircle2
              size={48}
              strokeWidth={2.5}
              className="animate-in zoom-in duration-500"
            />
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-3xl font-bold text-secondary font-cormorant mb-4 animate-in slide-in-from-bottom duration-700 delay-100 fill-mode-both">
          Document Sent Successfully!
        </h1>

        <p className="text-gray-600 mb-8 animate-in slide-in-from-bottom duration-700 delay-200 fill-mode-both">
          Your document has been sent to the recipient for signature. They will
          receive an email shortly to review and sign.
        </p>

        {/* Card for Document Info (Optional/Placeholder) */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-8 flex items-center gap-4 text-left border border-gray-100 animate-in slide-in-from-bottom duration-700 delay-300 fill-mode-both">
          <div className="size-12 rounded-xl bg-white flex items-center justify-center border border-gray-100 shadow-sm text-secondary">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Status
            </p>
            <p className="text-sm font-semibold text-gray-800">
              Pending Signature
            </p>
          </div>
          <div className="ml-auto">
            <Send size={18} className="text-green-500" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 animate-in slide-in-from-bottom duration-700 delay-400 fill-mode-both">
          <Link href="/documents" className="w-full">
            <Button className="w-full bg-secondary text-white hover:bg-secondary/90 h-12 text-base font-medium rounded-xl">
              Back to Documents
            </Button>
          </Link>

          <Link href="/transaction" className="w-full">
            <Button
              variant="outline"
              className="w-full border-gray-200 text-gray-600 hover:bg-gray-50 h-12 text-base font-medium rounded-xl flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} />
              Go to Transactions
            </Button>
          </Link>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 left-10 size-64 bg-secondary/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-10 size-64 bg-green-500/5 rounded-full blur-3xl -z-10 animate-pulse delay-700"></div>
    </div>
  );
}
