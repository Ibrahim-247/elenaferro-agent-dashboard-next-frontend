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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useForm, Controller, useWatch } from "react-hook-form";
import { CircleAlert, UserRoundPlus } from "lucide-react";

export default function CreateLead({ open, onOpenChange }) {
  // lead source data
  const leadSource = [
    { name: "Website", value: "website" },
    { name: "Referral", value: "referral" },
    { name: "Open House", value: "open_house" },
    { name: "Past Client", value: "past_client" },
    { name: "Cold Call", value: "cold_call" },
    { name: "Other", value: "other" },
  ];

  // timeline data
  const timeline = [
    { name: "Within 1 Month", value: "1" },
    { name: "1–3 Months", value: "1–3" },
    { name: "O3–6 Months", value: "O3–6" },
    { name: "6+ Months", value: "6+" },
    { name: "Not Sure Yet", value: "not_sure" },
  ];

  // hook form
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      lead_type: "",
    },
  });

  const leadType = useWatch({ control, name: "lead_type" });
  const hasRepairs = useWatch({ control, name: "hasRepairs" });

  const onSubmit = (data) => {
    console.log(data);
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="h-12 bg-secondary text-white hover:bg-secondary/90 px-5!">
          <UserRoundPlus /> Add New Lead
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-162! w-full max-h-[90vh] overflow-y-auto p-0 custom_scroll">
        <DialogHeader className="px-7 pt-6">
          <DialogTitle className="text-3xl font-bold text-secondary font-cormorant">
            Add New Lead
          </DialogTitle>
          <p className="text-lg font-normal">
            Enter the lead's information to add them to your CRM.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* ================= BASIC INFO ================= */}
          <section className="space-y-4 bg-white shadow p-3 rounded-lg mx-7">
            <h4 className="font-medium text-lg">Basic Information</h4>
            <div className="space-y-2.5">
              <h4 className="text-sm font-normal">Full Name</h4>
              <Input
                placeholder="Full Name"
                {...register("name", { required: "Full name is required" })}
              />
              <FieldError error={errors.name} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2.5">
                <h4 className="text-sm font-medium">Email Address*</h4>
                <Input
                  placeholder="Email Address"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/,
                      message: "Invalid email",
                    },
                  })}
                />
                <FieldError error={errors.email} />
              </div>
              <div className="space-y-2.5">
                <h4 className="text-sm font-medium">Phone Number*</h4>
                <Input
                  placeholder="Phone Number"
                  {...register("phone", { required: "Phone is required" })}
                />
                <FieldError error={errors.phone} />
              </div>
            </div>

            <div className="space-y-2.5">
              <h4 className="text-sm font-medium">Preferred Contact Method</h4>
              <Controller
                control={control}
                name="contactMethod"
                rules={{ required: "Select contact method" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Preferred Contact Method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="phone">Phone</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError error={errors.contactMethod} />
            </div>
          </section>
          {/*=============== lead type and source ==============*/}
          <section className="bg-white p-3 rounded-lg shadow space-y-4 mx-7">
            <h5 className="text-lg font-medium">Lead Type</h5>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2.5">
                <h4 className="text-sm font-normal">Lead Type</h4>
                <Controller
                  control={control}
                  name="lead_type"
                  className="w-full"
                  rules={{ required: "Lead type required" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Lead Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="buyer">Buyer</SelectItem>
                        <SelectItem value="seller">Seller</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError error={errors.lead_type} />
              </div>
              <div className="space-y-2.5">
                <h4 className="text-sm font-normal">Lead Type</h4>
                <Controller
                  control={control}
                  name="leadSource"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Lead Source" />
                      </SelectTrigger>
                      <SelectContent>
                        {leadSource?.map((item, index) => (
                          <SelectItem key={index} value={item?.value}>
                            {item?.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          </section>

          {/* ================= BUYER DETAILS ================= */}
          {leadType === "buyer" && (
            <section className="rounded-lg p-3 space-y-4 shadow mx-7">
              <h4 className="font-medium text-lg">Buyer Details</h4>
              <div className="space-y-2.5">
                <h4 className="text-sm font-normal">Desired Location (s)</h4>
                <Input
                  placeholder="Desired Locations"
                  {...register("location")}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2.5">
                  <h4 className="text-sm font-normal">$ Min Budget</h4>
                  <Input
                    type="number"
                    placeholder="Min Budget"
                    {...register("minBudget", { min: 0 })}
                  />
                </div>
                <div className="space-y-2.5">
                  <h4 className="text-sm font-normal">$ Max Budget</h4>
                  <Input
                    type="number"
                    placeholder="Max Budget"
                    {...register("maxBudget", { min: 0 })}
                  />
                </div>
              </div>
              {/* timeline & home type */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2.5">
                  <h4 className="text-sm font-normal">Move In Timeline</h4>
                  <Controller
                    control={control}
                    name="timeline"
                    className="w-full"
                    render={({ field }) => (
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeline?.map((item, index) => (
                            <SelectItem value={item?.value} key={index}>
                              {item?.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="space-y-2.5">
                  <h4 className="text-sm font-normal">Home Type</h4>
                  <Controller
                    control={control}
                    name="leadSource"
                    render={({ field }) => (
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select home type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="website">Website</SelectItem>
                          <SelectItem value="referral">Referral</SelectItem>
                          <SelectItem value="ads">Ads</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2.5">
                  <h4 className="text-sm font-normal">Bedrooms</h4>
                  <Input
                    placeholder="Bedrooms"
                    type="number"
                    {...register("bedrooms")}
                  />
                </div>
                <div className="space-y-2.5">
                  <h4 className="text-sm font-normal">Bathrooms</h4>
                  <Input
                    placeholder="Bathrooms"
                    type="number"
                    {...register("bathrooms")}
                  />
                </div>
              </div>
              <div className="space-y-2.5">
                <h4 className="text-sm font-normal">Must-Have Features</h4>
                <Textarea
                  placeholder="Must-have features"
                  {...register("features")}
                />
              </div>
              <div className="space-y-2.5">
                <h4 className="text-sm font-normal">Financing Status</h4>
                <Controller
                  control={control}
                  name="financing"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Financing Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="pre-approved">
                          Pre-approved
                        </SelectItem>
                        <SelectItem value="not-sure">Not Sure</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="space-y-2.5">
                <h4 className="text-sm font-normal">Notes/Preferences</h4>
                <Textarea
                  placeholder="Notes / Preferences"
                  {...register("buyerNotes")}
                />
              </div>
            </section>
          )}

          {/* ================= SELLER DETAILS ================= */}
          {leadType === "seller" && (
            <section className="rounded-lg shadow p-3 space-y-4 mx-7">
              <h4 className="font-medium text-lg">Seller Details</h4>
              <div className="space-y-2.5">
                <h4 className="text-sm font-normal">Property Adress</h4>
                <Input
                  placeholder="Property Address"
                  {...register("propertyAddress", {
                    required: "Property address required",
                  })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2.5">
                  <h4 className="text-sm font-normal">Estimated Home Value</h4>
                  <Input
                    type="number"
                    placeholder="Estimated Home Value"
                    {...register("homeValue")}
                  />
                </div>

                <div className="space-y-2.5">
                  <h4 className="text-sm font-normal">Reason for selling</h4>
                  <Input
                    type="text"
                    placeholder="Reason"
                    {...register("selling_reason")}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2.5">
                  <h4 className="text-sm font-normal">Timeline to sell</h4>
                  <Controller
                    control={control}
                    name="sell_timeline"
                    render={({ field }) => (
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="occupied">Occupied</SelectItem>
                          <SelectItem value="vacant">Vacant</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="space-y-2.5">
                  <h4 className="text-sm font-normal">Occupied or vacant</h4>
                  <Controller
                    control={control}
                    name="occupancy"
                    render={({ field }) => (
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Occupied or Vacant" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="occupied">Occupied</SelectItem>
                          <SelectItem value="vacant">Vacant</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-normal">Any Repairs Needed?</h4>

                  <label className="flex items-center gap-2">
                    <p className="text-sm font-medium">
                      {hasRepairs ? "Yes" : "No"}
                    </p>

                    <Controller
                      control={control}
                      name="hasRepairs"
                      defaultValue={false}
                      render={({ field }) => (
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-green-500"
                        />
                      )}
                    />
                  </label>
                </div>

                {/* SHOW ONLY WHEN YES */}
                {hasRepairs && (
                  <Textarea
                    placeholder="Describe repairs needed..."
                    {...register("repairs", {
                      required: "Please describe the repairs",
                    })}
                  />
                )}
              </div>

              <div className="space-y-2.5">
                <h4 className="text-sm font-normal">Marketing Preferences</h4>
                <Input
                  placeholder="Marketing Preferences"
                  {...register("marketing")}
                />
              </div>
            </section>
          )}

          {/* ================= ACTIONS ================= */}
          <div className="flex justify-end gap-3 sticky bottom-0 left-0 bg-white w-full pb-6 pt-2 px-7">
            <DialogClose>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>

            <Button
              type="submit"
              className="bg-secondary text-white hover:bg-secondary/90"
            >
              Save Lead
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
