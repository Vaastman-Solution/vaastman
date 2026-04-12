"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export function AuthErrorContent() {
    const searchParams = useSearchParams()
    const errorName = decodeURIComponent(searchParams.get("error") || "")

    // Split error into header and description
    const [header, description] = errorName.includes(":")
        ? errorName.split(":").map((part) => part.trim())
        : [errorName || "Authentication Error", "An unexpected error occurred."]

    return (
        <div className="flex min-h-screen items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-2xl space-y-4 sm:space-y-6">
                <Alert variant="destructive" className="p-4 sm:p-6 md:p-8">
                    <AlertCircle className="h-6 w-6 sm:h-8 sm:w-8" />
                    <AlertTitle className="mb-2 text-xl font-bold sm:mb-3 sm:text-2xl md:text-3xl">
                        {header.replace(/_/g, " ")}
                    </AlertTitle>
                    <AlertDescription className="text-sm sm:text-base md:text-lg">
                        {description.replace(/_/g, " ")}
                    </AlertDescription>
                </Alert>

                <div className="flex flex-col gap-3 sm:flex-row">
                    <Button asChild className="flex-1" variant={"outline"}>
                        <Link href="/signin">Back to Sign In</Link>
                    </Button>
                    <Button asChild className="flex-1">
                        <Link href="/contact">Contact to administrator</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}