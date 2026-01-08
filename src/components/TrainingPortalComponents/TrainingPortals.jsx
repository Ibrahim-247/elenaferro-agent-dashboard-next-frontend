import PortalCard from "./PortalCard";
import TrainingPortalHeader from "./TrainingPortalHeader";

export default function TrainingPortals() {
  return (
    <div className="space-y-6">
      <TrainingPortalHeader />
      <div className="grid grid-cols-5 gap-7">
        {[...Array(5)].map((_, index) => (
          <PortalCard />
        ))}
      </div>
    </div>
  );
}
