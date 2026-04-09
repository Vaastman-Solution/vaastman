"use client";

import { useState } from "react";
import {
	type FieldErrors,
	type Resolver,
	useForm,
} from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
	Field,
	FieldContent,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import {
	type AddCandidatePersonalSchema,
	addCandidatePersonalSchema,
} from "@/lib/zod-type/candidate_personal";

const genderOptions = ["MALE", "FEMALE", "OTHER"] as const;

const candidatePersonalResolver: Resolver<AddCandidatePersonalSchema> = async (
	values,
) => {
	const result = addCandidatePersonalSchema.safeParse(values);

	if (result.success) {
		return {
			values: result.data,
			errors: {},
		};
	}

	const errors: FieldErrors<AddCandidatePersonalSchema> = {};

	for (const issue of result.error.issues) {
		const fieldName = issue.path[0] as keyof AddCandidatePersonalSchema | undefined;

		if (!fieldName || errors[fieldName]) {
			continue;
		}

		errors[fieldName] = {
			type: "custom",
			message: issue.message,
		};
	}

	return {
		values: {},
		errors,
	};
};

export function AddCandidatePersonalForm({
	candidateId,
}: {
	candidateId: string;
}) {
	const [submittedData, setSubmittedData] =
		useState<AddCandidatePersonalSchema | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<AddCandidatePersonalSchema>({
		resolver: candidatePersonalResolver,
		defaultValues: {
			name: "",
			email: "",
			phone: "",
			fatherName: "",
			profilePhoto: "",
			gender: "MALE",
			dateOfBirth: "",
		},
		mode: "onBlur",
	});

	const onSubmit = async (data: AddCandidatePersonalSchema) => {
		setSubmittedData(data);
		console.log("candidate personal", { candidateId, ...data });
	};

	return (
		<div className="space-y-6">
			<div className="space-y-1">
				<h1 className="text-xl font-semibold">Candidate Personal Details</h1>
				<p className="text-sm text-muted-foreground">
					Candidate ID: {candidateId}
				</p>
			</div>

			<form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
				<FieldGroup className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
					<Field>
						<FieldLabel htmlFor="candidate-name" requiredLable>
							Name
						</FieldLabel>
						<FieldContent>
							<input
								id="candidate-name"
								type="text"
								placeholder="Enter full name"
								aria-invalid={errors.name ? "true" : "false"}
								className="h-10 rounded-md border border-input bg-background px-3 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
								{...register("name")}
							/>
							<FieldError errors={[errors.name]} />
						</FieldContent>
					</Field>

					<Field>
						<FieldLabel htmlFor="candidate-email" requiredLable>
							Email
						</FieldLabel>
						<FieldContent>
							<input
								id="candidate-email"
								type="email"
								placeholder="Enter email"
								aria-invalid={errors.email ? "true" : "false"}
								className="h-10 rounded-md border border-input bg-background px-3 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
								{...register("email")}
							/>
							<FieldError errors={[errors.email]} />
						</FieldContent>
					</Field>

					<Field>
						<FieldLabel htmlFor="candidate-phone" requiredLable>
							Phone
						</FieldLabel>
						<FieldContent>
							<input
								id="candidate-phone"
								type="tel"
								placeholder="Enter phone number"
								aria-invalid={errors.phone ? "true" : "false"}
								className="h-10 rounded-md border border-input bg-background px-3 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
								{...register("phone")}
							/>
							<FieldError errors={[errors.phone]} />
						</FieldContent>
					</Field>

					<Field>
						<FieldLabel htmlFor="candidate-father-name" requiredLable>
							Father Name
						</FieldLabel>
						<FieldContent>
							<input
								id="candidate-father-name"
								type="text"
								placeholder="Enter father name"
								aria-invalid={errors.fatherName ? "true" : "false"}
								className="h-10 rounded-md border border-input bg-background px-3 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
								{...register("fatherName")}
							/>
							<FieldError errors={[errors.fatherName]} />
						</FieldContent>
					</Field>

					<Field>
						<FieldLabel htmlFor="candidate-profile-photo" requiredLable>
							Profile Photo
						</FieldLabel>
						<FieldContent>
							<input
								id="candidate-profile-photo"
								type="text"
								placeholder="Enter profile photo URL or path"
								aria-invalid={errors.profilePhoto ? "true" : "false"}
								className="h-10 rounded-md border border-input bg-background px-3 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
								{...register("profilePhoto")}
							/>
							<FieldError errors={[errors.profilePhoto]} />
						</FieldContent>
					</Field>

					<Field>
						<FieldLabel htmlFor="candidate-gender" requiredLable>
							Gender
						</FieldLabel>
						<FieldContent>
							<select
								id="candidate-gender"
								aria-invalid={errors.gender ? "true" : "false"}
								className="h-10 rounded-md border border-input bg-background px-3 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
								{...register("gender")}
							>
								{genderOptions.map((gender) => (
									<option key={gender} value={gender}>
										{gender}
									</option>
								))}
							</select>
							<FieldError errors={[errors.gender]} />
						</FieldContent>
					</Field>

					<Field>
						<FieldLabel htmlFor="candidate-date-of-birth" requiredLable>
							Date Of Birth
						</FieldLabel>
						<FieldContent>
							<input
								id="candidate-date-of-birth"
								type="date"
								aria-invalid={errors.dateOfBirth ? "true" : "false"}
								className="h-10 rounded-md border border-input bg-background px-3 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
								{...register("dateOfBirth")}
							/>
							<FieldError errors={[errors.dateOfBirth]} />
						</FieldContent>
					</Field>
				</FieldGroup>

				<Button type="submit" disabled={isSubmitting}>
					Save Personal Details
				</Button>
			</form>

			{submittedData ? (
				<pre className="overflow-x-auto rounded-md border border-border bg-muted/40 p-3 text-xs">
					{JSON.stringify({ candidateId, ...submittedData }, null, 2)}
				</pre>
			) : null}
		</div>
	);
}
