"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function formatErrorText(value: string) {
  return value
    .replace(/\+/g, " ")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseErrorMessage(rawError: string) {
  if (!rawError) {
    return {
      title: "Authentication Error",
      description:
        "We couldn't complete your sign in request. Please try again or contact your administrator if the issue continues.",
    };
  }

  let decodedError = rawError;
  try {
    decodedError = decodeURIComponent(rawError);
  } catch (err) {
    console.error("Failed to decode error parameter:", err);
  }
  const [rawTitle, ...rest] = decodedError.split(":");
  const title = formatErrorText(rawTitle) || "Authentication Error";
  const description = formatErrorText(rest.join(":"));

  return {
    title,
    description:
      description ||
      "Something interrupted the authentication flow. Try signing in again, and if it keeps happening, ask your administrator to review the configuration.",
  };
}

export function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") || "";
  const { title, description } = parseErrorMessage(error);

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-background via-background to-destructive/5 p-4 sm:p-6">
      <Card className="w-full max-w-4xl border-destructive/15 shadow-xl shadow-destructive/5">
        <CardContent className="grid gap-0 p-0 md:grid-cols-[1.05fr_0.95fr]">
          <section className="flex flex-col justify-center gap-6 border-b border-border/60 px-6 py-8 sm:px-8 sm:py-10 md:border-r md:border-b-0 md:px-10">
            <div className="space-y-3">
              <div className="inline-flex w-fit rounded-full border border-destructive/15 bg-destructive/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-destructive">
                Sign in failed
              </div>
              <CardHeader className="space-y-3 px-0">
                <CardTitle className="text-3xl leading-tight sm:text-4xl">
                  {title}
                </CardTitle>
                <CardDescription className="max-w-xl text-base leading-7 text-muted-foreground">
                  {description}
                </CardDescription>
              </CardHeader>
            </div>

            <div className="rounded-2xl border border-border/60 bg-muted/40 p-4">
              <p className="text-sm font-medium text-foreground">
                What you can do next
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Please try signing in again. If it still does not work, contact
                your administrator for help.
              </p>
            </div>
          </section>

          <section className="flex flex-col justify-between px-6 py-8 sm:px-8 sm:py-10 md:px-10">
            <div className="flex flex-1 items-center justify-center">
              <div className="relative aspect-square w-full max-w-[240px] sm:max-w-[280px]">
                <Image
                  src="/error.svg"
                  alt="Error illustration"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </div>

            <CardFooter className="mt-8 flex flex-col gap-3 border-t border-border/60 px-0 pt-6 sm:flex-row">
              <Button asChild className="w-full sm:flex-1" variant="outline">
                <Link href="/signin">Back to Sign In</Link>
              </Button>
              <Button asChild className="w-full sm:flex-1">
                <Link href="/contact">Contact Administrator</Link>
              </Button>
            </CardFooter>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
