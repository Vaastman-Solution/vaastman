"use client";

import { useParams } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { AddCandidatePersonalForm } from "./components/personal_candidate/main";

export default function Page() {
	const params = useParams();

	const candidateId = params.id as string;




	return (
		<Tabs defaultValue="personal" className="w-full">
			<TabsList>
				<TabsTrigger value="personal">Personal</TabsTrigger>
				<TabsTrigger value="Education">Education</TabsTrigger>
			</TabsList>
			<TabsContent value="personal">
				<AddCandidatePersonalForm candidateId={candidateId} />
			</TabsContent>
			<TabsContent value="Education">Change your password here. Click save when you&apos;re done.</TabsContent>
		</Tabs>
	)

}