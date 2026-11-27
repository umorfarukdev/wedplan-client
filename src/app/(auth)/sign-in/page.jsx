"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "@/app/lib/auth-client";
import { Separator } from "@/components/ui/separator";
import GoogleSign from "@/components/shared/GoogleSign";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const { email, password } = Object.fromEntries(formData.entries());

    try {
      const { data, error } = await signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Login successful!");
      router.push("/");
    } catch (error) {
      toast.error(error.message || "Login failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>Login to your WedPlan account.</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>

            <Separator />

            <GoogleSign className="w-full" />

            <p className="text-center text-sm text-muted-foreground">
              Do not have an account?{" "}
              <Link
                href="/sign-up"
                className="font-semibold text-primary hover:underline"
              >
                Create Account
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
