import { Controller, type UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { useGetCollegeOptions } from "@/app/add/candidate/[id]/query/use-get-college-options";
import { ErrorDisplay } from "@/components/error-display";
import { Alert } from "@/components/ui/alert";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import type {
  AddCandidateEducationSchema,
  CandidateEducationCollegeOption,
} from "../../lib/zod-type/candidate-education";

export function SecondTwoRow({
  form,
}: {
  form: UseFormReturn<AddCandidateEducationSchema>;
}) {
  const {
    data: collegeOptions = [],
    isPending: isCollegeOptionsPending,
    error: collegeOptionsError,
  } = useGetCollegeOptions();

  if (collegeOptionsError) {
    alert(collegeOptionsError.message);
  }

  const selectedCollege = collegeOptions.find(
    (college) => college.name === form.watch("collegeName"),
  );

  return (
    <>
      <Controller
        control={form.control}
        name="collegeName"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel requiredLable>College Name</FieldLabel>
            <FieldContent>
              <NativeSelect
                className="w-full"
                {...field}
                aria-invalid={fieldState.invalid}
                disabled={isCollegeOptionsPending}
              >
                <NativeSelectOption value="">
                  Select college name
                </NativeSelectOption>
                {collegeOptions.map((college) => (
                  <NativeSelectOption key={college.name} value={college.name}>
                    {college.name}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
              <FieldError errors={[fieldState.error]} />
            </FieldContent>
          </Field>
        )}
      />

      <Controller
        control={form.control}
        name="collegeFee"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>College Fee</FieldLabel>
            <FieldContent>
              <Input
                {...field}
                disabled
                aria-invalid={fieldState.invalid}
                value={selectedCollege?.fees ?? ""}
              />
              <FieldError errors={[fieldState.error]} />
            </FieldContent>
          </Field>
        )}
      />

      <Controller
        control={form.control}
        name="duration"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel requiredLable>Duration</FieldLabel>
            <FieldContent>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                placeholder="e.g. 2020-2024"
              />
              <FieldError errors={[fieldState.error]} />
            </FieldContent>
          </Field>
        )}
      />

      <Controller
        control={form.control}
        name="domainOrMainSubject"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel requiredLable>Domain/Main Subject</FieldLabel>
            <FieldContent>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                placeholder="Enter domain or main subject"
              />
              <FieldError errors={[fieldState.error]} />
            </FieldContent>
          </Field>
        )}
      />

      <Controller
        control={form.control}
        name="mjcSubject"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel requiredLable>MJC Subject</FieldLabel>
            <FieldContent>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                placeholder="Enter MJC subject"
              />
              <FieldError errors={[fieldState.error]} />
            </FieldContent>
          </Field>
        )}
      />
    </>
  );
}
