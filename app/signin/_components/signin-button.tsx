"use client"
import { Button } from "@/components/ui/button"
import { LoadingSwap } from "@/components/ui/loading-swap"
import { authClient } from "@/lib/auth-client"
import { useState } from "react"
// import { FcGoogle } from "react-icons/fc"

export function SignInButton() {
    const [loading, setLoading] = useState(false)
    const handleSignin = async () => {
        setLoading(true)
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/home",
            errorCallbackURL: "/api/auth/error",
        })
    }
    return (
        <>
            <Button
                variant="outline"
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 py-6 text-base"
                onClick={handleSignin}
            >
                <LoadingSwap className="flex items-center gap-3" isLoading={loading}>
                    Sign in with Google
                </LoadingSwap>
            </Button>
        </>
    )
}