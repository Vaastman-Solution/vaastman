import { ContentLayout } from "@/components/admin-panel/content-layout";

export default function TestPage() {
  return (
    <ContentLayout title="Test">
      <div className="h-screen w-full bg-red-500 text-white flex">Hello</div>
    </ContentLayout>
  );
}
