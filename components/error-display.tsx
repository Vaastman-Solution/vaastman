// components/ui/error-display.tsx

import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation"; // or "next/router" for pages directory
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface ErrorDisplayProps {
  message?: string;
  showButton?: boolean;
  redirectPath?: string;
  buttonText?: string;
}

export function ErrorDisplay({
  message = "Something went wrong. Please try again.",
  showButton = true,
  redirectPath = "/",
  buttonText = "Go to Home Page",
}: ErrorDisplayProps) {
  const router = useRouter();

  const handleRedirect = () => {
    router.push(redirectPath);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-center">
            <AlertCircle className="text-destructive size-12" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-destructive text-center font-medium">{message}</p>
        </CardContent>
        {showButton && (
          <CardFooter className="flex justify-center">
            <Button onClick={handleRedirect} variant="default">
              {buttonText}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
