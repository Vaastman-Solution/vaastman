"use client";

import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { AddCandidatePersonalForm } from "./components/personal_candidate/main";

export default function Page() {
	const params = useParams();
	const router = useRouter();

	const candidateId = params.id as string;

	return (
		<div className="mx-auto flex w-full flex-col gap-4 p-4 sm:p-6 md:p-8">
			<div className="flex w-full flex-col items-center gap-2 sm:grid sm:grid-cols-[85px_1fr_85px] sm:gap-4">
				<Button
					type="button"
					variant="link"
					onClick={() => router.back()}
					className="w-fit self-start gap-2 px-0 text-muted-foreground hover:bg-transparent hover:text-foreground sm:self-auto"
				>
					<ArrowLeft className="size-4" />
					Back
				</Button>

				<h3 className="m-0 w-full text-center">
					Candidate Information
				</h3>

				<div className="hidden h-10 w-[85px] sm:block" aria-hidden="true" />
			</div>

			<Tabs defaultValue="personal" className="gap-4">
				<TabsList className="grid h-auto w-full grid-cols-2 rounded-2xl p-1">
					<TabsTrigger value="personal" className="min-w-0 px-3">
						Personal
					</TabsTrigger>
					<TabsTrigger value="Education" disabled className="min-w-0 px-3">
						Education
					</TabsTrigger>
				</TabsList>
				<TabsContent value="personal" className="mt-0">
					<AddCandidatePersonalForm candidateId={candidateId} />
				</TabsContent>
				<TabsContent value="Education" className="mt-0">
					Change your password here. Click save when you&apos;re done.
				</TabsContent>
			</Tabs>
		</div>
	);
}
