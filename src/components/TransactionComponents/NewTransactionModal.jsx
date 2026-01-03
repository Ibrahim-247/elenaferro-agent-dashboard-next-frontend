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
import { CalendarRange, Plus, X } from "lucide-react";
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

export default function NewTransactionModal() {
  // hook form
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      listingDate: null,
      closeDate: null,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const FieldError = ({ error }) =>
    error ? <p className="text-xs text-red-500">{error.message}!</p> : null;

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="h-12 bg-secondary text-white hover:bg-secondary/90 px-5!">
            <Plus className="size-6" /> New Transaction
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-150! [&>button]:hidden  p-0">
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
                New Transaction
              </DialogTitle>
              <p className="text-sm font-normal">
                Create a new transaction record for tracking deals and
                documents.
              </p>
            </DialogHeader>
            {/* Transaction Info */}
            <div className="space-y-3 px-8">
              <h4 className="text-lg font-medium">Transaction Info</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-[#404A60]">Listing Date</label>
                  <Controller
                    control={control}
                    name="listingDate"
                    rules={{ required: "Listing date is required" }}
                    render={({ field }) => (
                      <>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={`w-full justify-start gap-2 h-10 text-gray-500 ${
                                errors.listingDate && "border-red-500"
                              }`}
                            >
                              <CalendarRange />
                              {field.value
                                ? field.value.toLocaleDateString()
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

                <div className="grid gap-2">
                  <label className="text-[#404A60]">Expected Close Date</label>
                  <Controller
                    control={control}
                    name="closeDate"
                    rules={{ required: "Expected close date is required" }}
                    render={({ field }) => (
                      <>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={`w-full justify-start gap-2 h-10 text-gray-500 ${
                                errors.closeDate && "border-red-500"
                              }`}
                            >
                              <CalendarRange />
                              {field.value
                                ? field.value.toLocaleDateString()
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
                  name="client"
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
                          <SelectItem value="client1">Client 1</SelectItem>
                          <SelectItem value="client2">Client 2</SelectItem>
                        </SelectContent>
                      </Select>

                      <FieldError error={errors.client} />
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
                  {...register("address", {
                    required: "Property address is required",
                  })}
                />
                <FieldError error={errors.address} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-[#404A60]">Property Type</label>
                  <Controller
                    control={control}
                    name="propertyType"
                    rules={{ required: "Property type is required" }}
                    render={({ field }) => (
                      <>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger
                            className={`h-10! w-full ${
                              errors.propertyType && "border-red-500"
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
                    className={`h-10 ${errors.price && "border-red-500"}`}
                    type="number"
                    {...register("price", {
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
                  {...register("notes")}
                />
              </div>
            </div>

            <div className="sticky bottom-0 left-0 bg-white pb-8 pt-3 px-8 flex items-center gap-3.5">
              <DialogClose asChild>
                <Button variant="outline" className="w-full shrink h-10">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="bg-secondary text-white hover:bg-secondary/90 w-full shrink h-10"
              >
                Save Transaction
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
