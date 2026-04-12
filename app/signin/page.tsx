import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { SignInButton } from "./_components/signin-button"

export default async function Signin() {
    const session = await auth.api.getSession({ headers: await headers() })
    if (session) {
        redirect("/home")
    }
    return (
        <div className="flex min-h-screen items-center justify-center">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl">AK-Diagnostic.in</CardTitle>
                    <CardDescription>Sign in to continue</CardDescription>
                </CardHeader>
                <CardContent>
                    <SignInButton />
                </CardContent>
            </Card>
        </div>
    )
}