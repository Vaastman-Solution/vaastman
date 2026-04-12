import { IconLockFilled } from "@tabler/icons-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { ArrowLeft } from "@/components/animate-ui/icons/arrow-left";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { SignInButton } from "./_components/signin-button";

export default async function Signin() {
    const session = await auth.api.getSession({ headers: await headers() });

    if (session) {
        redirect("/home");
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
            <Card className="w-full max-w-md border-border/70">
                <CardHeader className="space-y-3 text-center">
                    <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <IconLockFilled className="size-5" />
                    </div>
                    <CardTitle className="text-2xl">
                        Sign in to Vaastman Solutions
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    <SignInButton />
                    <Button variant="outline" asChild className="w-full gap-2">
                        <AnimateIcon animateOnHover asChild>
                            <Link href="/home">
                                <ArrowLeft className="size-5" />
                                Back to Home Page
                            </Link>
                        </AnimateIcon>
                    </Button>
                    <p className="text-center text-sm text-muted-foreground">
                        If you cannot access your account, contact your administrator.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
