import { ContentLayout } from "@/components/admin-panel/content-layout";
import { getCollegeInfoById } from "../college/edit/[id]/lib/actions";

export default async function TestPage() {
  const { data } = await getCollegeInfoById("cmoyum29j0001tzczgo1guxk3");
  console.log(JSON.stringify(data, null, 2));
  return (
    <ContentLayout title="Test">
      <div className="h-screen w-full bg-red-500 text-white flex">Hello</div>
    </ContentLayout>
  );
}
