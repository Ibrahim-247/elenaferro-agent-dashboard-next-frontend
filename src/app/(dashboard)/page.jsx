import DashboardMain from "@/components/DashboardComponents/DashboardMain";
import RecentActivity from "@/components/DashboardComponents/RecentActivity";

export default function page() {
  return (
    <div className="space-y-6">
      <DashboardMain />
      <RecentActivity />
    </div>
  );
}
