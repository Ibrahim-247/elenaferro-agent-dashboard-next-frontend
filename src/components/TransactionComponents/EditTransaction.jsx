"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CalendarRange, SquarePen, X } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";
import { useForm, Controller } from "react-hook-form";
import useApiMutation from "@/hooks/useApiMutation";
import { useEffect, useState } from "react";
import { useLeadlist } from "@/hooks/crm.api";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export default function EditTransaction({ datas }) {
  const [open, setopen] = useState();
  const queryClient = useQueryClient();

  // hook form
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...datas,
      start_date: datas?.start_date ?? "",
      close_date: datas?.close_date ?? "",
    },
  });

  useEffect(() => {
    if (datas) {
      reset({
        ...datas,
      });
    }
  }, [datas, reset]);

  // lead list
  const { data } = useLeadlist();
  const leads = data?.data?.data;

  // update transaction api call
  const updateTransaction = useApiMutation({
    key: "transaction_update",
    isPrivate: true,
    endpoint: `/agent/transaction/update/${datas?.id}`,
    onSuccess: (data) => {
      setopen(false);
      toast.success(`Transaction updated ${data?.data?.transaction_id}`);
      queryClient?.invalidateQueries(["transaction_list"]);
    },
    onError: (error) => {
      console.error("Transaction update error:", error);
    },
  });

  //   submit data
  const onSubmit = (data) => {
    updateTransaction?.mutate({
      ...data,
      start_date: data?.start_date
        ? new Date(data.start_date).toLocaleDateString("en-CA")
        : null,
      close_date: data?.close_date
        ? new Date(data.close_date).toLocaleDateString("en-CA")
        : null,
    });
  };

  const FieldError = ({ error }) =>
    error ? <p className="text-xs text-red-500">{error.message}!</p> : null;

  return (
    <div>
      <Dialog open={open} onOpenChange={setopen}>
        <DialogTrigger asChild>
          <div className="size-7 rounded-full bg-[#F4F6F8] flex items-center justify-center cursor-pointer">
            <SquarePen className="text-gray-500 size-5" />
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-150! [&>button]:hidden p-0">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="overflow-auto h-[90vh] space-y-5"
          >
            <DialogClose asChild>
              <div
                type="button"
                className="absolute right-4 top-4 size-8 flex items-center justify-center rounded-full border text-muted-foreground hover:bg-gray-100 hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </div>
            </DialogClose>
            <DialogHeader className="px-8 pt-8">
              <DialogTitle className="text-3xl font-bold text-secondary font-cormorant">
                Update Transaction
              </DialogTitle>
            </DialogHeader>
            {/* Transaction Info */}
            <div className="space-y-3 px-8">
              <h4 className="text-lg font-medium">Transaction Info</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-[#404A60]">Listing Date</label>
                  <Controller
                    control={control}
                    name="start_date"
                    rules={{ required: "Listing date is required" }}
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={`w-full justify-start gap-2 h-10 text-gray-500 ${
                              errors.start_date && "border-red-500"
                            }`}
                          >
                            <CalendarRange />
                            {field?.value && !isNaN(new Date(field.value))
                              ? new Date(field.value).toLocaleDateString(
                                  "en-CA",
                                )
                              : "Pick a date"}
                          </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                </div>

                <div className="grid gap-2">
                  <label className="text-[#404A60]">Expected Close Date</label>
                  <Controller
                    control={control}
                    name="close_date"
                    rules={{ required: "Expected close date is required" }}
                    render={({ field }) => (
                      <>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={`w-full justify-start gap-2 h-10 text-gray-500 ${
                                errors.close_date && "border-red-500"
                              }`}
                            >
                              <CalendarRange />
                              {field?.value && !isNaN(new Date(field.value))
                                ? new Date(field.value).toLocaleDateString(
                                    "en-CA",
                                  )
                                : "Pick a date"}
                            </Button>
                          </PopoverTrigger>

                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                            />
                          </PopoverContent>
                        </Popover>
                      </>
                    )}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <label className="text-[#404A60]">Satus</label>
                <Controller
                  control={control}
                  name="status"
                  rules={{ required: "Status is required" }}
                  render={({ field }) => (
                    <>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="h-10! w-full">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>

                      <FieldError error={errors.status} />
                    </>
                  )}
                />
              </div>
            </div>

            {/* Client Information */}
            <div className="space-y-3 px-8">
              <h4 className="text-lg font-medium">Client Information</h4>
              <div className="grid gap-2">
                <label className="text-[#404A60]">Select Client</label>
                <Controller
                  control={control}
                  name="lead_id"
                  rules={{ required: "Client is required" }}
                  render={({ field }) => (
                    <>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="h-10! w-full">
                          <SelectValue placeholder="Select client" />
                        </SelectTrigger>
                        <SelectContent>
                          {leads?.map((item, index) => (
                            <SelectItem value={item?.id} key={index}>
                              {item?.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FieldError error={errors.lead_id} />
                    </>
                  )}
                />
              </div>
            </div>

            {/* Property Details */}
            <div className="space-y-3 px-8">
              <h4 className="text-lg font-medium">Property Details</h4>
              <div className="grid gap-2">
                <label className="text-[#404A60]">Property Address</label>
                <Input
                  placeholder="123 Maple Ave, Atlanta, GA 30301"
                  className="h-10"
                  {...register("property_address", {
                    required: "Property address is required",
                  })}
                />
                <FieldError error={errors.property_address} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-[#404A60]">Property Type</label>
                  <Controller
                    control={control}
                    name="property_type"
                    rules={{ required: "Property type is required" }}
                    render={({ field }) => (
                      <>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger
                            className={`h-10! w-full ${
                              errors.property_type && "border-red-500"
                            }`}
                          >
                            <SelectValue placeholder="Property type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="house">House</SelectItem>
                            <SelectItem value="apartment">Apartment</SelectItem>
                          </SelectContent>
                        </Select>
                      </>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-[#404A60]">Listing Price</label>
                  <Input
                    placeholder="00000"
                    className={`h-10 ${
                      errors.listing_price && "border-red-500"
                    }`}
                    type="number"
                    {...register("listing_price", {
                      required: "Listing price is required",
                      min: {
                        value: 1,
                        message: "Price must be greater than 0",
                      },
                    })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <label className="text-[#404A60]">Internal Notes</label>
                <Textarea
                  placeholder="Add any internal notes..."
                  {...register("internal_notes")}
                />
              </div>
            </div>

            <div className="sticky bottom-0 left-0 bg-white pb-8 pt-3 px-8 flex items-center gap-3.5">
              <DialogClose asChild>
                <Button
                  disabled={updateTransaction?.isPending}
                  onClick={() => setopen(false)}
                  variant="outline"
                  className="w-full shrink h-10"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={updateTransaction?.isPending}
                className="bg-secondary text-white hover:bg-secondary/90 w-full shrink h-10"
              >
                {updateTransaction?.isPending && <Spinner />} Save Transaction
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
