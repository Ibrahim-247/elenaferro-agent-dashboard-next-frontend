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

export function ViewDocumentModal({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <div className="size-7 rounded-full bg-[#F4F6F8] flex items-center justify-center cursor-pointer">
          <Eye className="text-gray-500 size-5" />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-150! rounded-2xl p-6 [&>button]:hidden overflow-auto max-h-screen">
        {/* Header */}
        <DialogHeader className="relative gap-0">
          <DialogTitle className="text-2xl font-semibold text-secondary font-cormorant">
            #TRX- <span className="font-inter">1021</span>
          </DialogTitle>
          <p className="text-sm text-gray-600 mt-1">
            Jhon Smith • 123 Maple Ave, Atlanta, GA
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
            value="123 Maple Ave, Atlanta, GA 30301"
          />

          <InfoRow
            icon={<DollarSign size={16} />}
            label="Listing Price"
            value="$500,000"
          />
        </section>

        {/* ================= CLIENT INFORMATION ================= */}
        <section className="mt-6 space-y-3">
          <h4 className="font-semibold text-gray-800">Client Information</h4>

          <InfoRow icon={<User size={16} />} label="Name" value="Jhon Smith" />

          <InfoRow
            icon={<Mail size={16} />}
            label="Email"
            value="rifatsf102@gmail.com"
          />

          <InfoRow
            icon={<Phone size={16} />}
            label="Phone"
            value="+44 56650 5546"
          />
        </section>

        {/* ================= TRANSACTION DATES ================= */}
        <section className="mt-6 space-y-3">
          <h4 className="font-semibold text-gray-800">Transaction Dates</h4>

          <InfoRow
            icon={<Calendar size={16} />}
            label="Start Date"
            value="3 Nov 2025"
          />

          <InfoRow
            icon={<Calendar size={16} />}
            label="Close Date"
            value="Not Set"
          />
        </section>

        {/* ================= NOTES ================= */}
        <section className="mt-6 space-y-2">
          <h4 className="font-semibold text-gray-800">Notes</h4>
          <div className="bg-yellow-50 rounded-lg p-4 text-sm text-gray-700 font-normal">
            First-time home buyer. Pre-approved for up to $550K. Looking for
            3-bedroom home with backyard. Timeline flexible but prefers to close
            before end of year.
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
