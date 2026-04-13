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
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { AddCollegeSchema } from "../lib/zod-type/college-info";

function normalizeDomain(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function DomainsInput({
  field,
  fieldState,
}: {
  field: ControllerRenderProps<AddCollegeSchema, "domains">;
  fieldState: ControllerFieldState;
}) {
  const [domainInput, setDomainInput] = useState("");
  const domains = field.value ?? [];

  const addDomain = (value: string) => {
    const normalizedDomain = normalizeDomain(value);
    if (!normalizedDomain) {
      return;
    }

    const hasDuplicate = domains.some(
      (domain) => domain.toLowerCase() === normalizedDomain.toLowerCase(),
    );
    if (hasDuplicate) {
      return;
    }

    field.onChange([...domains, normalizedDomain]);
  };

  const removeDomain = (domainToRemove: string) => {
    field.onChange(domains.filter((domain) => domain !== domainToRemove));
  };

  const commitInput = () => {
    if (!domainInput.trim()) {
      return;
    }

    addDomain(domainInput);
    setDomainInput("");
  };

  return (
    <Field>
      <FieldLabel>Domains</FieldLabel>
      <FieldContent>
        <Input
          aria-invalid={fieldState.invalid}
          onBlur={() => {
            commitInput();
            field.onBlur();
          }}
          onChange={(event) => setDomainInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === ",") {
              event.preventDefault();
              commitInput();
              return;
            }

            if (event.key === "Backspace" && !domainInput && domains.length) {
              removeDomain(domains[domains.length - 1]);
            }
          }}
          placeholder="Type a domain and press Enter"
          ref={field.ref}
          value={domainInput}
        />
        <FieldDescription>
          Press Enter or comma to add a domain. Backspace removes the last one.
        </FieldDescription>
        {domains.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {domains.map((domain) => (
              <span
                key={domain}
                className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs"
              >
                {domain}
                <button
                  aria-label={`Remove ${domain}`}
                  className="font-medium text-muted-foreground hover:text-foreground"
                  onClick={() => removeDomain(domain)}
                  type="button"
                >
                  x
                </button>
              </span>
            ))}
          </div>
        )}
        <FieldError errors={[fieldState.error]} />
      </FieldContent>
    </Field>
  );
}

export function InputRow1({ form }: { form: UseFormReturn<AddCollegeSchema> }) {
  return (
    <div className="space-y-4">
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
          <DomainsInput field={field} fieldState={fieldState} />
        )}
      />
    </div>
  );
}
