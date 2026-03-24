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
import {
  CalendarRange,
  Plus,
  X,
  User,
  Home,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
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
import { useForm, Controller, useWatch } from "react-hook-form";
import useApiMutation from "@/hooks/useApiMutation";
import { useState, useEffect } from "react";
import { useLeadlist } from "@/hooks/crm.api";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Checkbox } from "@/components/ui/checkbox";
import UserGroupSvg from "../svg/UserGroupSvg";
import Home11Svg from "../svg/Home11Svg";

const FieldError = ({ error }) =>
  error ? <p className="text-xs text-red-500">{error.message}!</p> : null;

const SectionTitle = ({ children }) => (
  <h4 className="text-lg font-semibold text-secondary border-b pb-1 mb-4">
    {children}
  </h4>
);

export default function NewTransactionModal() {
  const [open, setopen] = useState(false);
  const [step, setStep] = useState(0); // 0: Selection, 1: Form
  const [transactionType, setTransactionType] = useState(null); // 'buyer' or 'seller'
  const queryClient = useQueryClient();

  // hook form
  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      transaction_type: "",
      client_info_type: "existing",
      lead_id: "",
      client_name: "",
      client_email: "",
      client_phone: "",
      property_address: "",
      mls: "",
      listing_price: "",
      offer_price: "",
      contract_price: "",
      earnest_money: "",
      financing_type: [],
      date_listing: null,
      date_binding_agreement: null,
      date_due_diligence: null,
      date_finance_contingency: null,
      date_closing: null,
      lender_info: "",
      closing_attorney_info: "",
      title_company_info: "",
      buyer_agent_info: "",
      commission_notes: "",
      inspection_notes: "",
      notes: "",
    },
  });

  const clientInfoType = useWatch({ control, name: "client_info_type" });
  const selectedLeadId = useWatch({ control, name: "lead_id" });

  // lead list
  const { data: leadData } = useLeadlist();
  const leads = leadData?.data?.data;

  // Auto-populate client info when lead is selected
  useEffect(() => {
    if (selectedLeadId && leads) {
      const lead = leads.find((l) => String(l.id) === String(selectedLeadId));
      if (lead) {
        setValue("client_name", lead.name || "");
        setValue("client_email", lead.email || "");
        setValue("client_phone", lead.phone || "");
      }
    }
  }, [selectedLeadId, leads, setValue]);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!open) {
      setStep(0);
      setTransactionType(null);
      reset();
    }
  }, [open, reset]);

  // create transaction api call
  const createTransaction = useApiMutation({
    key: "create_transaction",
    isPrivate: true,
    endpoint: `/agent/transaction/create`,
    onSuccess: (data) => {
      console.log(data);

      setopen(false);
      toast.success(`Transaction created successfully`);
      queryClient?.invalidateQueries(["transaction_list"]);
    },
    onError: (error) => {
      console.log("Transaction create error:", error);
      toast.error("Failed to create transaction");
    },
  });

  const onSubmit = (data) => {
    const payload = {
      ...data,
      transaction_type: transactionType,
      // Format dates for backend
      date_listing: data.date_listing?.toLocaleDateString("en-CA"),
      date_binding_agreement:
        data.date_binding_agreement?.toLocaleDateString("en-CA"),
      date_due_diligence: data.date_due_diligence?.toLocaleDateString("en-CA"),
      date_finance_contingency:
        data.date_finance_contingency?.toLocaleDateString("en-CA"),
      date_closing: data.date_closing?.toLocaleDateString("en-CA"),
    };

    console.log(payload);

    createTransaction?.mutate(payload);
  };

  const handleSelectType = (type) => {
    setTransactionType(type);
    setStep(1);
  };

  const financingOptions = ["Cash", "Conventional", "FHA", "VA"];

  return (
    <div>
      <Dialog open={open} onOpenChange={setopen}>
        <DialogTrigger asChild>
          <Button className="md:h-12 bg-secondary text-white hover:bg-secondary/90 md:px-5!">
            <Plus className="size-5" /> New Transaction
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl! p-0 overflow-hidden flex flex-col max-h-[90vh]">
          {/* Header */}
          <div className="px-8 pt-8 pb-4 bg-white sticky top-0 z-10 border-b">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-3xl font-bold text-secondary font-cormorant">
                  {step === 0
                    ? "New Transaction"
                    : `New ${transactionType === "buyer" ? "Buyer" : "Seller"} Transaction`}
                </DialogTitle>
                <p className="text-sm text-gray-500 mt-1">
                  {step === 0
                    ? "Select the type of transaction to begin."
                    : `Fill out the details for your ${transactionType} client.`}
                </p>
              </div>
              <DialogClose asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <X className="h-5 w-5" />
                </Button>
              </DialogClose>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex-1 overflow-y-auto space-y-8 custom_scroll"
          >
            {step === 0 ? (
              /* Step 0: Selection */
              <div className="grid sm:grid-cols-2 gap-6 py-10 px-8 overflow-auto custom_scroll">
                <button
                  type="button"
                  onClick={() => handleSelectType("buyer")}
                  className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl hover:border-secondary hover:bg-secondary/5 transition-all group"
                >
                  <div className="size-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:text-white transition-colors">
                    <UserGroupSvg className="size-9" />
                  </div>
                  <span className="text-xl font-semibold text-secondary">
                    Buyer
                  </span>
                  <p className="text-sm text-gray-500 text-center mt-2">
                    Representing the client purchasing a property
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectType("seller")}
                  className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl hover:border-secondary hover:bg-secondary/5 transition-all group"
                >
                  <div className="size-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:text-white transition-colors">
                    <Home11Svg className="size-8" />
                  </div>
                  <span className="text-xl font-semibold text-secondary">
                    Seller
                  </span>
                  <p className="text-sm text-gray-500 text-center mt-2">
                    Representing the client selling a property
                  </p>
                </button>
              </div>
            ) : (
              /* Step 1: Form */
              <div className="px-8 py-6 space-y-5">
                {/* Client Info Section */}
                <section>
                  <SectionTitle>Client Information</SectionTitle>
                  <div className="grid gap-4">
                    <div className="flex items-center gap-4 mb-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          {...register("client_info_type")}
                          value="existing"
                          className="accent-secondary"
                        />
                        <span className="text-sm font-medium">
                          Select from CRM
                        </span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          {...register("client_info_type")}
                          value="new"
                          className="accent-secondary"
                        />
                        <span className="text-sm font-medium">
                          Add New Client
                        </span>
                      </label>
                    </div>

                    {clientInfoType === "existing" ? (
                      <div className="grid gap-2">
                        <label className="text-sm font-medium text-[#404A60]">
                          Select Client
                        </label>
                        <Controller
                          control={control}
                          name="lead_id"
                          rules={{
                            required:
                              clientInfoType === "existing"
                                ? "Client is required"
                                : false,
                          }}
                          render={({ field }) => (
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger className="h-10 w-full">
                                <SelectValue placeholder="Search leads..." />
                              </SelectTrigger>
                              <SelectContent>
                                {leads?.map((item) => (
                                  <SelectItem
                                    value={`${item?.id}`}
                                    key={item?.id}
                                  >
                                    {item?.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                        <FieldError error={errors.lead_id} />
                      </div>
                    ) : null}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="grid gap-2">
                        <label className="text-sm font-medium text-[#404A60]">
                          Name
                        </label>
                        <Input
                          placeholder="Client Name"
                          readOnly={clientInfoType === "existing"}
                          className={
                            clientInfoType === "existing" ? "bg-gray-50" : ""
                          }
                          {...register("client_name", {
                            required: "Name is required",
                          })}
                        />
                        <FieldError error={errors.client_name} />
                      </div>
                      <div className="grid gap-2">
                        <label className="text-sm font-medium text-[#404A60]">
                          Email
                        </label>
                        <Input
                          placeholder="Email Address"
                          readOnly={clientInfoType === "existing"}
                          className={
                            clientInfoType === "existing" ? "bg-gray-50" : ""
                          }
                          {...register("client_email")}
                        />
                      </div>
                      <div className="grid gap-2">
                        <label className="text-sm font-medium text-[#404A60]">
                          Phone
                        </label>
                        <Input
                          placeholder="Phone Number"
                          readOnly={clientInfoType === "existing"}
                          className={
                            clientInfoType === "existing" ? "bg-gray-50" : ""
                          }
                          {...register("client_phone")}
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Property Info Section */}
                <section>
                  <SectionTitle>Property Info</SectionTitle>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2 md:col-span-2">
                      <label className="text-sm font-medium text-[#404A60]">
                        Property Address
                      </label>
                      <Input
                        placeholder="123 Main St, Atlanta, GA"
                        {...register("property_address", {
                          required: "Address is required",
                        })}
                      />
                      <FieldError error={errors.property_address} />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium text-[#404A60]">
                        MLS (Optional)
                      </label>
                      <Input placeholder="MLS#" {...register("mls")} />
                    </div>
                    {transactionType === "seller" && (
                      <div className="grid gap-2">
                        <label className="text-sm font-medium text-[#404A60]">
                          List Price
                        </label>
                        <Input
                          type="number"
                          placeholder="$0.00"
                          {...register("listing_price")}
                        />
                      </div>
                    )}
                  </div>
                </section>

                {/* Offer/Contract Details Section */}
                <section>
                  <SectionTitle>
                    {transactionType === "buyer"
                      ? "Offer Details"
                      : "Contract Details"}
                  </SectionTitle>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <label className="text-sm font-medium text-[#404A60]">
                        {transactionType === "buyer"
                          ? "Offer Price"
                          : "Contract Price"}
                      </label>
                      <Input
                        type="number"
                        placeholder="$0.00"
                        {...register(
                          transactionType === "buyer"
                            ? "offer_price"
                            : "contract_price",
                        )}
                      />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium text-[#404A60]">
                        Earnest Money Amt
                      </label>
                      <Input
                        type="number"
                        placeholder="$0.00"
                        {...register("earnest_money")}
                      />
                    </div>
                    <div className="grid gap-2 md:col-span-2">
                      <label className="text-sm font-medium text-[#404A60] mb-1">
                        Financing Type
                      </label>
                      <div className="flex flex-wrap gap-4">
                        {financingOptions.map((option) => (
                          <div
                            key={option}
                            className="flex items-center space-x-2"
                          >
                            <Controller
                              name="financing_type"
                              control={control}
                              render={({ field }) => (
                                <Checkbox
                                  id={`fin-${option}`}
                                  checked={field.value?.includes(option)}
                                  onCheckedChange={(checked) => {
                                    const currentValues = field.value || [];
                                    const nextValues = checked
                                      ? [...currentValues, option]
                                      : currentValues.filter(
                                          (v) => v !== option,
                                        );
                                    field.onChange(nextValues);
                                  }}
                                />
                              )}
                            />
                            <label
                              htmlFor={`fin-${option}`}
                              className="text-sm font-medium leading-none cursor-pointer"
                            >
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Important Dates Section */}
                <section>
                  <SectionTitle>Important Dates</SectionTitle>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {transactionType === "seller" && (
                      <div className="grid gap-2">
                        <label className="text-sm font-medium text-[#404A60]">
                          Listing Date
                        </label>
                        <Controller
                          control={control}
                          name="date_listing"
                          render={({ field }) => (
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start text-left font-normal h-10"
                                >
                                  <CalendarRange className="mr-2 h-4 w-4" />
                                  {field.value
                                    ? field.value.toLocaleDateString()
                                    : "Select date"}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
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
                    )}
                    <div className="grid gap-2">
                      <label className="text-sm font-medium text-[#404A60]">
                        Binding Agreement
                      </label>
                      <Controller
                        control={control}
                        name="date_binding_agreement"
                        render={({ field }) => (
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal h-10"
                              >
                                <CalendarRange className="mr-2 h-4 w-4" />
                                {field.value
                                  ? field.value.toLocaleDateString()
                                  : "Select date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
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
                      <label className="text-sm font-medium text-[#404A60]">
                        Due Diligence
                      </label>
                      <Controller
                        control={control}
                        name="date_due_diligence"
                        render={({ field }) => (
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal h-10"
                              >
                                <CalendarRange className="mr-2 h-4 w-4" />
                                {field.value
                                  ? field.value.toLocaleDateString()
                                  : "Select date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
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
                      <label className="text-sm font-medium text-[#404A60]">
                        Finance Contingency
                      </label>
                      <Controller
                        control={control}
                        name="date_finance_contingency"
                        render={({ field }) => (
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal h-10"
                              >
                                <CalendarRange className="mr-2 h-4 w-4" />
                                {field.value
                                  ? field.value.toLocaleDateString()
                                  : "Select date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
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
                      <label className="text-sm font-medium text-[#404A60]">
                        Closing Date
                      </label>
                      <Controller
                        control={control}
                        name="date_closing"
                        render={({ field }) => (
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal h-10"
                              >
                                <CalendarRange className="mr-2 h-4 w-4" />
                                {field.value
                                  ? field.value.toLocaleDateString()
                                  : "Select date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
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
                  </div>
                </section>

                {/* Lender & Closing / Closing Info Section */}
                <section>
                  <SectionTitle>
                    {transactionType === "buyer"
                      ? "Lender & Closing"
                      : "Closing Info"}
                  </SectionTitle>
                  <div className="grid gap-4">
                    {transactionType === "buyer" && (
                      <div className="grid gap-2">
                        <label className="text-sm font-medium text-[#404A60]">
                          Lender Name + Contact
                        </label>
                        <Input
                          placeholder="Lender info"
                          {...register("lender_info")}
                        />
                      </div>
                    )}
                    <div className="grid gap-2">
                      <label className="text-sm font-medium text-[#404A60]">
                        Closing Attorney Name + Contact
                      </label>
                      <Input
                        placeholder="Attorney info"
                        {...register("closing_attorney_info")}
                      />
                    </div>
                    {transactionType === "buyer" && (
                      <div className="grid gap-2">
                        <label className="text-sm font-medium text-[#404A60]">
                          Title Company Name + Contact
                        </label>
                        <Input
                          placeholder="Title company info"
                          {...register("title_company_info")}
                        />
                      </div>
                    )}
                  </div>
                </section>

                {/* Buyer Agent Info (Seller only) */}
                {transactionType === "seller" && (
                  <section>
                    <SectionTitle>Buyer Agent Info</SectionTitle>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium text-[#404A60]">
                        Buyer Agent Name and Contact
                      </label>
                      <Input
                        placeholder="Name and phone/email"
                        {...register("buyer_agent_info")}
                      />
                    </div>
                  </section>
                )}

                {/* Notes Sections */}
                <section>
                  <SectionTitle>Additional Information</SectionTitle>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <label className="text-sm font-medium text-[#404A60]">
                        Commission Notes
                      </label>
                      <Textarea
                        placeholder="Commission details..."
                        {...register("commission_notes")}
                      />
                    </div>
                    {transactionType === "buyer" ? (
                      <div className="grid gap-2">
                        <label className="text-sm font-medium text-[#404A60]">
                          Inspection Notes
                        </label>
                        <Textarea
                          placeholder="Inspection details..."
                          {...register("inspection_notes")}
                        />
                      </div>
                    ) : (
                      <div className="grid gap-2">
                        <label className="text-sm font-medium text-[#404A60]">
                          Notes
                        </label>
                        <Textarea
                          placeholder="General notes..."
                          {...register("notes")}
                        />
                      </div>
                    )}
                  </div>
                </section>
              </div>
            )}

            {/* Footer */}
            {step > 0 && (
              <div className="px-8 py-4 bg-gray-50 sticky bottom-0 left-0 z-111 border-t flex items-center justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(0)}
                  className="gap-2"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>

                <div
                  className={
                    step === 0 ? "w-full flex justify-end" : "flex gap-3"
                  }
                >
                  <DialogClose asChild>
                    <Button variant="ghost">Cancel</Button>
                  </DialogClose>

                  <Button
                    type="submit"
                    disabled={createTransaction?.isPending}
                    className="bg-secondary text-white hover:bg-secondary/90 min-w-32"
                  >
                    {createTransaction?.isPending ? (
                      <Spinner />
                    ) : (
                      <CheckCircle2 className="size-4" />
                    )}
                    Save Transaction
                  </Button>
                </div>
              </div>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
