import DocumentDetails from "@/components/DocumentComponent/DocumentDetails";

export default async function page({ params }) {
  const { id } = await params;

  return (
    <div>
      <DocumentDetails id={id} />
    </div>
  );
}
