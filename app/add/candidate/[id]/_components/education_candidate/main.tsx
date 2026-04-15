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
import { LoadingSwap } from "@/components/ui/loading-swap";
import {
  type AddCandidateEducationSchema,
  addCandidateEducationSchema,
} from "../../lib/zod-type/candidate-education";
import { useAddCandidateEducation } from "../../query/mut-add-candidate-education";
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
      id: candidateId,
      universityRoll: "",
      grade: "",
      marks: "",
      collegeName: "",
      duration: "",
      domainOrMainSubject: "",
      mjcSubject: "",
    },
  });

  const { mutateAsync: addCandidateEducation, isPending } =
    useAddCandidateEducation({ candidateId });

  const onSubmit = (data: AddCandidateEducationSchema) => {
    addCandidateEducation(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
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
            <LoadingSwap isLoading={isPending}>
              Save Education Details
            </LoadingSwap>
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
