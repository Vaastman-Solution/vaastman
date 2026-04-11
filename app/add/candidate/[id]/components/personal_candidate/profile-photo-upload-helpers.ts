export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
] as const;

export type UploadResponse = {
  url?: string;
  error?: string;
};

export function isAcceptedImageType(file: File): boolean {
  return (ACCEPTED_IMAGE_TYPES as readonly string[]).includes(file.type);
}

export async function uploadProfilePhoto(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/img", {
    method: "POST",
    body: formData,
  });

  const result = (await response.json()) as UploadResponse;

  if (!response.ok || !result.url) {
    throw new Error(result.error || "Image upload failed.");
  }

  return result.url;
}
