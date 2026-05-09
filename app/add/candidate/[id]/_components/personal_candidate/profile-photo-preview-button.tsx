import { IconEyeFilled } from "@tabler/icons-react";
import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InputGroupButton } from "@/components/ui/input-group";

export function ProfilePhotoPreviewButton({
  previewUrl,
}: {
  previewUrl: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <InputGroupButton aria-label="Preview uploaded image" variant="default">
          <IconEyeFilled className="size-5" data-icon="inline-start" />
          Preview
        </InputGroupButton>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-lg!">Profile Photo Preview</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center">
          <div className="relative aspect-3/4 w-full max-w-xs overflow-hidden rounded-3xl border bg-muted">
            <Image
              alt="Candidate profile preview"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 80vw, 320px"
              src={previewUrl}
              unoptimized
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
