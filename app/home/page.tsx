"use client";
import { toast } from "react-toastify";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
export default function Page() {
  return (
    <div className="flex min-h-[calc(100vh-100px)] flex-col items-center justify-center gap-8">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl">
        vaastman solution
      </h1>
      <div className="flex items-center gap-4">
        <Button onClick={() => toast.success("Hello world")}>Click me</Button>
        <ModeToggle />
      </div>
    </div>
  );
}
