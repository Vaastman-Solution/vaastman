import { ContentLayout } from "@/components/admin-panel/content-layout";
import { getCollegeInfoById } from "../college/edit/[id]/lib/actions";

export default async function TestPage() {
  const { data } = await getCollegeInfoById("cmoypwwgq000178cz5h8sbgzo");
  console.log(data);
  return (
    <ContentLayout title="Test">
      <div className="h-screen w-full bg-red-500 text-white flex">Hello</div>
    </ContentLayout>
  );
}
