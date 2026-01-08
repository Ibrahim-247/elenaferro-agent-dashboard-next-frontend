import TransactionStats from "@/components/TransactionComponents/TransactionStats";
import TransactionTable from "@/components/TransactionComponents/TransactionTable";

export default function page() {
  return (
    <div className="space-y-6">
      <TransactionStats />
      <TransactionTable />
    </div>
  );
}
