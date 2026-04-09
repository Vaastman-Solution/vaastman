"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type AddCandidatePersonalSchema,
  addCandidatePersonalSchema,
} from "@/lib/zod-type/candidate_personal";
import { FirstTwoRow } from "./first-2-row";
import { SecondTwoRow } from "./second-2-row";

export function AddCandidatePersonalForm({
  candidateId,
}: {
  candidateId: string;
}) {
  const form = useForm<AddCandidatePersonalSchema>({
    resolver: zodResolver(addCandidatePersonalSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      fatherName: "",
      profilePhoto: "",
      gender: "MALE",
      dateOfBirth: "",
    },
  });

  const onSubmit = (data: AddCandidatePersonalSchema) => {
    console.log(data)
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit, (errors) => console.log("Validation errors:", errors))}>
      <Card>
        <CardHeader className="gap-2">
          <CardTitle className="max-w-none">
            <h4>
              Personal Details
            </h4>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <FirstTwoRow form={form} />
            <SecondTwoRow form={form} />
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          <Button type="submit" size="lg" className="px-8 text-base">
            Save Personal Details
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
