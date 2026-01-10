"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  MapPin,
  DollarSign,
  User,
  Mail,
  Phone,
  Calendar,
  X,
  Eye,
} from "lucide-react";

export function ViewDocumentModal({ data }) {
  console.log("data from modal", data);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="size-7 rounded-full bg-[#F4F6F8] flex items-center justify-center cursor-pointer">
          <Eye className="text-gray-500 size-5" />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-150! rounded-2xl p-6 [&>button]:hidden overflow-auto max-h-screen">
        {/* Header */}
        <DialogHeader className="relative gap-0">
          <DialogTitle className="text-2xl font-semibold text-secondary font-inter">
            {data?.transaction_id}
          </DialogTitle>
          <p className="text-sm text-gray-600 mt-1">
            {data?.client_name} • {data?.property_address}
          </p>

          <DialogClose className="absolute right-0 top-0 rounded-full border p-2">
            <X size={18} />
          </DialogClose>
        </DialogHeader>

        {/* ================= PROPERTY DETAILS ================= */}
        <section className="mt-6 space-y-3">
          <h4 className="font-semibold text-gray-800">Property Details</h4>

          <InfoRow
            icon={<MapPin size={16} />}
            label="Address"
            value={data?.property_address}
          />

          <InfoRow
            icon={<DollarSign size={16} />}
            label="Listing Price"
            value={`$${data?.listing_price}`}
          />
        </section>

        {/* ================= CLIENT INFORMATION ================= */}
        <section className="mt-6 space-y-3">
          <h4 className="font-semibold text-gray-800">Client Information</h4>

          <InfoRow
            icon={<User size={16} />}
            label="Name"
            value={data?.client_name}
          />

          <InfoRow
            icon={<Mail size={16} />}
            label="Email"
            value={data?.client_email}
          />

          <InfoRow
            icon={<Phone size={16} />}
            label="Phone"
            value={data?.client_phone}
          />
        </section>

        {/* ================= TRANSACTION DATES ================= */}
        <section className="mt-6 space-y-3">
          <h4 className="font-semibold text-gray-800">Transaction Dates</h4>

          <InfoRow
            icon={<Calendar size={16} />}
            label="Start Date"
            value={data?.start_date}
          />

          <InfoRow
            icon={<Calendar size={16} />}
            label="Close Date"
            value={data?.close_date}
          />
        </section>

        {/* ================= NOTES ================= */}
        <section className="mt-6 space-y-2">
          <h4 className="font-semibold text-gray-800">Notes</h4>
          <div className="bg-yellow-50 rounded-lg p-4 text-sm text-gray-700 font-normal">
            {data?.internal_notes}
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
}

/* ================= REUSABLE ROW ================= */
function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 text-sm">
      <div className="text-gray-500 mt-1">{icon}</div>
      <div>
        <p className="text-gray-500">{label}</p>
        <p className="text-gray-800 font-medium">{value}</p>
      </div>
    </div>
  );
}
