import { createId } from "@paralleldrive/cuid2";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function Page() {
  const cuid = createId();
  redirect(`/add/candidate/${cuid}`);
}
