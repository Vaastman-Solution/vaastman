import { useEffect } from "react";
import { Controller, type UseFormReturn } from "react-hook-form";
import type { AddCandidateEducationSchema } from "@/app/add/candidate/[id]/lib/zod-type/candidate-education";
import { useGetCollegeOptions } from "@/app/add/candidate/[id]/query/use-get-college-options";
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

export function SecondTwoRow({
  form,
}: {
  form: UseFormReturn<AddCandidateEducationSchema>;
}) {
  const { data: collegeOptions = [] } = useGetCollegeOptions();

  const selectedCollege = collegeOptions.find(
    (college) => college.name === form.watch("collegeName"),
  );

  const selectedSession = selectedCollege?.sessions.find(
    (session) => session.name === form.watch("session"),
  );

  useEffect(() => {
    if (selectedSession) {
      form.setValue("collegeFee", selectedSession.fees ?? "");
      form.setValue("duration", selectedSession.duration ?? "");
    } else {
      form.setValue("collegeFee", "");
      form.setValue("duration", "");
    }
  }, [selectedSession, form.setValue]);

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
              >
                <NativeSelectOption value="">
                  Select college name
                </NativeSelectOption>
                {collegeOptions.map((college) => (
                  <NativeSelectOption key={college.id} value={college.name}>
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
        name="session"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel requiredLable>Session</FieldLabel>
            <FieldContent>
              <NativeSelect
                className="w-full"
                {...field}
                aria-invalid={fieldState.invalid}
                disabled={
                  !selectedCollege || selectedCollege.sessions.length === 0
                }
              >
                <NativeSelectOption value="">Select session</NativeSelectOption>
                {selectedCollege?.sessions.map((session) => (
                  <NativeSelectOption key={session.id} value={session.name}>
                    {session.name}
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
        name="duration"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel requiredLable>Duration</FieldLabel>
            <FieldContent>
              <Input
                {...field}
                disabled
                aria-invalid={fieldState.invalid}
                value={selectedSession?.duration ?? ""}
              />
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
                value={selectedSession?.fees ?? ""}
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
              <NativeSelect
                className="w-full"
                {...field}
                aria-invalid={fieldState.invalid}
                disabled={
                  !selectedCollege || selectedCollege.domains.length === 0
                }
              >
                <NativeSelectOption value="">
                  Select domain or main subject
                </NativeSelectOption>
                {selectedCollege?.domains.map((domain) => (
                  <NativeSelectOption key={domain.id} value={domain.name}>
                    {domain.name}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
              <FieldError errors={[fieldState.error]} />
            </FieldContent>
          </Field>
        )}
      />
    </>
  );
}
