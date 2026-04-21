import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CheckoutTermsPage() {
  return (
    <main className="container mx-auto max-w-3xl py-10">
      <Card>
        <CardHeader>
          <CardTitle>Checkout Terms and Conditions</CardTitle>
          <CardDescription>
            Please read these terms carefully before making payment.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            By proceeding with payment, you confirm that the candidate details
            and selected session details are correct.
          </p>
          <p>
            Payment once made is{" "}
            <span className="font-semibold">non-refundable</span>.
          </p>
          <p>
            In case of payment gateway failure or duplicate debit, resolution
            depends on banking and gateway timelines.
          </p>
          <p>
            Vaastman Solution reserves the right to verify payment details
            before final confirmation.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
