import DashboardStats from "@/components/DashboardComponents/DashboardStats";
import DealsBarchart from "@/components/DashboardComponents/DealsBarchart";
import RecentActivity from "@/components/DashboardComponents/RecentActivity";

export default function page() {
  return (
    <div className="space-y-6">
      <DashboardStats />
      <DealsBarchart />
      <RecentActivity />
    </div>
  );
}
