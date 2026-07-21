import { useEffect, useRef, useState } from "react";

const DOWNLOAD_STEPS = [
  { label: "Verifying your data…", duration: 8000 },
  { label: "Getting your data…", duration: 4000 },
  { label: "Preparing certificate…", duration: 8000 },
  { label: "Almost there, please wait…", duration: 8000 },
  { label: "Downloading…", duration: Infinity },
] as const;

/**
 * Returns a cycling status label while `isActive` is true.
 * Resets back to the first step when `isActive` turns false.
 */
export function useDownloadStatus(isActive: boolean): string {
  const [stepIndex, setStepIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isActive) {
      setStepIndex(0);
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    const step = DOWNLOAD_STEPS[stepIndex];
    if (!step || step.duration === Infinity) return;

    timerRef.current = setTimeout(() => {
      setStepIndex((prev) =>
        prev < DOWNLOAD_STEPS.length - 1 ? prev + 1 : prev,
      );
    }, step.duration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isActive, stepIndex]);

  return DOWNLOAD_STEPS[stepIndex]?.label ?? "Downloading…";
}
