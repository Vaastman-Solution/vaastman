import { useState } from "react";
import {
  Controller,
  type ControllerFieldState,
  type ControllerRenderProps,
  type UseFormReturn,
} from "react-hook-form";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import type { IUpdateCollegeSchema } from "../lib/zod-type/type";

function normalizeDomain(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function DomainsInput({
  field,
  fieldState,
  domainOptions,
}: {
  field: ControllerRenderProps<IUpdateCollegeSchema, "domains">;
  fieldState: ControllerFieldState;
  domainOptions: string[];
}) {
  const domains = field.value ?? [];

  const [domainItems, setDomainItems] = useState<string[]>(() => {
    const all = [...domainOptions, ...domains]
      .map(normalizeDomain)
      .filter(Boolean);
    return Array.from(
      new Map(all.map((domain) => [domain.toLowerCase(), domain])).values(),
    ).sort((a, b) => a.localeCompare(b));
  });

  const ensureDomainItems = (values: string[]) => {
    const normalizedValues = values.map(normalizeDomain).filter(Boolean);
    if (!normalizedValues.length) {
      return;
    }

    setDomainItems((prev) => {
      const byLower = new Map(
        prev.map((domain) => [domain.toLowerCase(), domain]),
      );
      normalizedValues.forEach((domain) => {
        byLower.set(domain.toLowerCase(), domain);
      });
      return Array.from(byLower.values()).sort((a, b) => a.localeCompare(b));
    });
  };

  return (
    <Field>
      <FieldLabel>Domains</FieldLabel>
      <FieldContent>
        <MultiSelect
          onValuesChange={(values) => {
            ensureDomainItems(values);
            field.onChange(values);
            field.onBlur();
          }}
          values={domains}
        >
          <MultiSelectTrigger
            aria-invalid={fieldState.invalid}
            className="w-full justify-between"
          >
            <MultiSelectValue
              className="max-w-[90%]"
              placeholder="Select domains"
              overflowBehavior="wrap"
            />
          </MultiSelectTrigger>
          <MultiSelectContent
            creatable={{
              createLabel: (value) => `Add "${value}"`,
            }}
            search={{
              placeholder: "Search or add domains, by comma separated",
              emptyMessage: "No domain found. Type to create one.",
            }}
            uppercaseSearch
          >
            {domainItems.map((domainOption) => (
              <MultiSelectItem key={domainOption} value={domainOption}>
                {domainOption}
              </MultiSelectItem>
            ))}
          </MultiSelectContent>
        </MultiSelect>
        <FieldError errors={[fieldState.error]} />
      </FieldContent>
    </Field>
  );
}

export function InputForm({
  form,
  domainOptions,
  universityName,
}: {
  form: UseFormReturn<IUpdateCollegeSchema>;
  domainOptions: string[];
  universityName: string;
}) {
  const currentYear = new Date().getFullYear();
  const startSessionYears = Array.from({ length: 7 }, (_, index) =>
    String(currentYear - 3 + index),
  );
  const endSessionYears = Array.from({ length: 10 }, (_, index) =>
    String(currentYear - 2 + index),
  );

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 [&>[data-slot=field]]:min-w-0">
      <Field className="md:col-span-2">
        <FieldLabel>University</FieldLabel>
        <FieldContent>
          <p className="rounded-md border bg-muted/40 px-3 py-2 text-sm">
            This college is associated with{" "}
            <span className="font-medium">
              {universityName.replace(/_/g, " ")}
            </span>
            .
          </p>
        </FieldContent>
      </Field>

      <Controller
        control={form.control}
        name="collegeName"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel requiredLable>College Name</FieldLabel>
            <FieldContent>
              <Input {...field} aria-invalid={fieldState.invalid} />
              <FieldError errors={[fieldState.error]} />
            </FieldContent>
          </Field>
        )}
      />

      <Controller
        control={form.control}
        name="code"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>College code (optional)</FieldLabel>
            <FieldContent>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                value={field.value ?? ""}
              />
              <FieldError errors={[fieldState.error]} />
            </FieldContent>
          </Field>
        )}
      />

      <Controller
        control={form.control}
        name="fees"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel requiredLable>Fees</FieldLabel>
            <FieldContent>
              <Input
                type="number"
                {...field}
                aria-invalid={fieldState.invalid}
              />
              <FieldError errors={[fieldState.error]} />
            </FieldContent>
          </Field>
        )}
      />

      <Controller
        control={form.control}
        name="domains"
        render={({ field, fieldState }) => (
          <DomainsInput
            domainOptions={domainOptions}
            field={field}
            fieldState={fieldState}
          />
        )}
      />

      <Controller
        control={form.control}
        name="startSession"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel requiredLable>Start Session</FieldLabel>
            <FieldContent>
              <NativeSelect
                {...field}
                aria-invalid={fieldState.invalid}
                className="w-full"
                value={field.value ?? ""}
              >
                <NativeSelectOption value="">
                  Select start year
                </NativeSelectOption>
                {startSessionYears.map((year) => (
                  <NativeSelectOption key={year} value={year}>
                    {year}
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
        name="endSession"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel requiredLable>End Session</FieldLabel>
            <FieldContent>
              <NativeSelect
                {...field}
                aria-invalid={fieldState.invalid}
                className="w-full"
                value={field.value ?? ""}
              >
                <NativeSelectOption value="">
                  Select end year
                </NativeSelectOption>
                {endSessionYears.map((year) => (
                  <NativeSelectOption key={year} value={year}>
                    {year}
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
            <FieldLabel requiredLable>Duration (in hours)</FieldLabel>
            <FieldContent>
              <Input
                type="number"
                {...field}
                aria-invalid={fieldState.invalid}
                placeholder="example: 60"
              />
              <FieldError errors={[fieldState.error]} />
            </FieldContent>
          </Field>
        )}
      />
    </div>
  );
}
