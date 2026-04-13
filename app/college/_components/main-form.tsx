import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  type AddCollegeSchema,
  addCollegeSchema,
} from "@/app/college/lib/zod-type/college-info";
import { Button } from "@/components/ui/button";
import { InputRow1 } from "./input-row1";

export function AddCollegeForm() {
  const form = useForm<AddCollegeSchema>({
    resolver: zodResolver(addCollegeSchema),
    defaultValues: {
      collegeName: "",
      code: "",
      fees: "",
      domains: [],
    },
  });

  const onSubmit = (data: AddCollegeSchema) => {
    console.log(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <InputRow1 form={form} />
      <div className="mt-4 flex justify-end">
        <Button type="submit">Add College</Button>
      </div>
    </form>
  );
}
