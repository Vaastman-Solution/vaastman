"use client";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
export default function Page() {
	return (
		<Button onClick={() => toast.success("Hello world",)}>Click me</Button>
	)
}