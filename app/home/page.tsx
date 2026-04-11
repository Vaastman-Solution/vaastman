"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
export default function Page() {
	return (
		<div>

			<Button onClick={() => toast.success("Hello world",)}>Click me</Button>
			<ModeToggle />
		</div>
	)
}