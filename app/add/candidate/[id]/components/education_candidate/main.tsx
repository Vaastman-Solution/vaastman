"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type AddCandidateEducationSchema,
  addCandidateEducationSchema,
} from "@/lib/zod-type/candidate_education";
import { FirstTwoRow } from "./first-2-row";
import { SecondTwoRow } from "./second-2-row";

export function AddCandidateEducationForm({
  candidateId,
}: {
  candidateId: string;
}) {
  const form = useForm<AddCandidateEducationSchema>({
    resolver: zodResolver(addCandidateEducationSchema),
    defaultValues: {
      universityRoll: "",
      grade: "",
      marks: "",
      collegeName: "",
      duration: "",
      domainOrMainSubject: "",
      mjcSubject: "",
    },
  });

  const onSubmit = (data: AddCandidateEducationSchema) => {
    console.log({ candidateId, ...data });
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit, (errors) =>
        console.log("Validation errors:", errors),
      )}
    >
      <Card>
        <CardHeader className="gap-2">
          <CardTitle className="max-w-none">
            <h4>Education Details</h4>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <FirstTwoRow form={form} />
            <SecondTwoRow form={form} />
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          <Button className="px-8 text-base" size="lg" type="submit">
            Save Education Details
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
