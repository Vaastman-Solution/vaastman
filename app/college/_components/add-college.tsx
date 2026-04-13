"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddCollegeForm } from "./main-form";

export function AddCollege({ domainOptions }: { domainOptions: string[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button>Add College</Button>
      </DialogTrigger>
      {/* clicking outsid should not close dialog */}
      <DialogContent onInteractOutside={(event) => event.preventDefault()}>
        <DialogHeader>
          <DialogTitle asChild>
            <h4>Add College</h4>
          </DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new college.
          </DialogDescription>
        </DialogHeader>
        <AddCollegeForm
          domainOptions={domainOptions}
          onSuccess={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
