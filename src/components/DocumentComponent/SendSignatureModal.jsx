"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { CircleAlert, SendHorizontal } from "lucide-react";
import { Spinner } from "../ui/spinner";
import { useState } from "react";
import useApiMutation from "@/hooks/useApiMutation";
import { useQueryClient } from "@tanstack/react-query";
import { Alert, AlertTitle } from "../ui/alert";
import pdfImg from "../../assets/pdf.png";
import Image from "next/image";
import Swal from "sweetalert2";

export default function SendSignatureModal({ documents, id, connected }) {
  const [open, setopen] = useState();
  const queryClient = useQueryClient();

  const document = documents?.filter((item) => item?.id === id);

  // hook form
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //  send documents for signature
  const DocumentSend = useApiMutation({
    key: "send_signature",
    isPrivate: true,
    endpoint: `/agent/document/${id}/send-for-signature`,
    onSuccess: () => {
      Swal.fire({
        title: "The document has been successfully sent for E-signature",
        text: "When the recipient views and signs the document, you will be notified in email.",
        imageUrl: "https://cdn-icons-png.flaticon.com/512/14090/14090371.png",
        imageWidth: 68,
        imageHeight: 68,
        customClass: {
          icon: "sign-swal-success-icon",
          title: "sign-swal-title",
          htmlContainer: "sign-swal-text",
          confirmButton: "sign-swal-confirm-btn",
        },
      });
      setopen(false);
      queryClient.invalidateQueries(["document_details"]);
    },
    onError: (error) => {
      console.error("Error from document send", error);
    },
  });

  const onSubmit = (data) => {
    console.log(data);

    // DocumentSend?.mutate(data);
  };

  const FieldError = ({ error }) => {
    if (!error) return null;
    return (
      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
        <CircleAlert className="size-3" />
        {error.message}
      </p>
    );
  };

  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger asChild>
        {connected && (
          <Button>
            Send <SendHorizontal />
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-162! w-full max-h-[90vh] overflow-y-auto p-0 custom_scroll">
        <DialogHeader className="px-7 pt-6">
          <DialogTitle className="text-3xl font-bold text-secondary font-cormorant">
            Send for E-Signature
          </DialogTitle>
          <p className="text-lg font-normal">
            Send "Client_Agreement.pdf" to a client for electronic signature.
          </p>
          {document?.map((item, index) => (
            <div
              key={index}
              className="bg-yellow-50 p-3 rounded-lg flex items-center gap-3"
            >
              <Image src={pdfImg} alt="pdf" className="w-12" />
              <div className="space-y-0.5">
                <h5 className="text-base font-medium">{item?.file_name}</h5>
                <p className="text-[#4F586D] text-sm font-normal">PDF</p>
              </div>
            </div>
          ))}
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <section className="space-y-4 p-5 mb-0">
            <div className="space-y-2.5">
              <h4 className="text-sm font-normal">Recipient Name</h4>
              <Input
                placeholder="Recipient Name"
                {...register("recipient_name", {
                  required: "Recipient name is required",
                })}
              />
              <FieldError error={errors.recipient_name} />
            </div>

            <div className="space-y-2.5">
              <h4 className="text-sm font-medium">Recipient Email</h4>
              <Input
                placeholder="Recipient Email"
                {...register("recipient_email", {
                  required: "Recipient email is required",
                  pattern: {
                    value: /^\S+@\S+$/,
                    message: "Invalid email",
                  },
                })}
              />
              <FieldError error={errors.recipient_email} />
            </div>

            <Alert className="bg-yellow-50 ">
              <AlertTitle className="line-clamp-none! font-normal">
                The recipient will receive an email with a link to view and sign
                this document. You'll be notified when the document is viewed
                and signed.
              </AlertTitle>
            </Alert>
          </section>

          <div className="flex justify-end gap-3 sticky bottom-0 left-0 bg-white w-full pb-6 pt-2 px-7">
            <DialogClose>
              <Button
                disabled={DocumentSend?.isPending}
                variant="outline"
                type="button"
              >
                Cancel
              </Button>
            </DialogClose>

            <Button
              disabled={DocumentSend?.isPending}
              className="bg-secondary text-white hover:bg-secondary/90"
            >
              Send for Signature {DocumentSend?.isPending && <Spinner />}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
