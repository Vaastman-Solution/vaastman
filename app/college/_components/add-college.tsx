"use client";
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

export function AddCollege() {
  return (
    <Dialog>
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
        <AddCollegeForm />
      </DialogContent>
    </Dialog>
  );
}
