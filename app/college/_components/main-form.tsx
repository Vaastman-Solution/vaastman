import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  type AddCollegeSchema,
  addCollegeSchema,
} from "@/app/college/lib/zod-type/college-info";
import { Button } from "@/components/ui/button";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { useAddCollegeInfo } from "../query/mut-add-collegeInfo";
import { InputRow1 } from "./input-row1";

export function AddCollegeForm({
  domainOptions,
  onSuccess,
}: {
  domainOptions: string[];
  onSuccess: () => void;
}) {
  const form = useForm<AddCollegeSchema>({
    resolver: zodResolver(addCollegeSchema),
    defaultValues: {
      collegeName: "",
      code: "",
      startSession: "",
      endSession: "",
      duration: "",
      fees: "",
      domains: [],
    },
  });

  const { mutateAsync: addCollegeInfo, isPending } = useAddCollegeInfo();

  const onSubmit = async (data: AddCollegeSchema) => {
    await addCollegeInfo(data);
    onSuccess();
  };

  return (
    <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
      <div>
        <InputRow1 domainOptions={domainOptions} form={form} />
      </div>
      <div className="mt-4 flex justify-end">
        <Button type="submit">
          <LoadingSwap isLoading={isPending}>Add College</LoadingSwap>
        </Button>
      </div>
    </form>
  );
}
