import PublicFolders from "@/components/PublicFolderComponents/PublicFolders";
import PublicFolderStats from "@/components/PublicFolderComponents/PublicFolderStats";

export default function page() {
  return (
    <div className="space-y-6">
      <PublicFolderStats />
      <PublicFolders />
    </div>
  );
}
