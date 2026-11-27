import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = {
  title: "Forgot Password | WedPlan",
};

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Forgot Password?</CardTitle>
          <CardDescription>
            We can help you regain access to your WedPlan account.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5 text-sm text-muted-foreground">
          <p>
            Email verification and password-reset emails are not configured in
            this environment yet. Please contact support with the email address
            linked to your account and we will help you reset your password.
          </p>

          <a
            href="mailto:support@wedplan.com?subject=Password reset request"
            className="block rounded-md bg-rose-600 px-4 py-3 text-center font-medium text-white hover:bg-rose-700"
          >
            Contact Support
          </a>

          <p className="text-center">
            Remembered your password?{" "}
            <Link href="/sign-in" className="font-semibold text-rose-600 hover:underline">
              Back to sign in
            </Link>
          </p>

          <Link href="/sign-up" className="block text-center text-xs hover:underline">
            Need an account? Create one
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
