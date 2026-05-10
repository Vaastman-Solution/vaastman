import { ContentLayout } from "@/components/admin-panel/content-layout"
import { getQueryClient } from "@/lib/get-query-client";
import { getCollegeByIdHook } from "./query/get-college-by-id";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { MainForm } from "./_components/main-form";

export default async function Page({
  params
}: {params: Promise<{id: string}>}) {
  const { id } = await params;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(getCollegeByIdHook(id));

  return (
    <ContentLayout title="Edit College">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <main>
          <MainForm collegeId={id} />
        </main>
      </HydrationBoundary>
    </ContentLayout>
  );
}