"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
import { useAddCandidatePersonal } from "@/hook/mutation/use-addCandidate_Personal";
import { LoadingSwap } from "@/components/ui/loading-swap";

export function AddCandidatePersonalForm({
  candidateId,
}: {
  candidateId: string;
}) {
  const form = useForm<AddCandidatePersonalSchema>({
    resolver: zodResolver(addCandidatePersonalSchema),
    defaultValues: {
      id: candidateId,
      name: "",
      email: "",
      phone: "",
      fatherName: "",
      profilePhoto: "",
      gender: "MALE",
      dateOfBirth: "",
    },
  });

  const { mutateAsync: addCandidatePersonal, isPending } = useAddCandidatePersonal({ candidateId });

  const onSubmit = (data: AddCandidatePersonalSchema) => {
    addCandidatePersonal(data);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Card>
        <CardHeader className="gap-2">
          <CardTitle className="max-w-none">
            <h4>Personal Details</h4>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <FirstTwoRow form={form} />
            <SecondTwoRow form={form} />
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          <Button
            type="submit"
            size="lg"
            className="px-8 text-base"
          >
            <LoadingSwap isLoading={isPending}>
              Save Personal Details
            </LoadingSwap>
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
