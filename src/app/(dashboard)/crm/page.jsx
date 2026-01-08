import CrmStats from "@/components/CrmComponents/CrmStats";
import LeadsTabel from "@/components/CrmComponents/LeadsTabel";

export default function page() {
  return (
    <div className="space-y-6">
      <CrmStats />
      <LeadsTabel />
    </div>
  );
}
