"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { signUp } from "@/app/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData.entries());
    const { name, email, password, role } = data;

    if (!["customer", "vendor"].includes(role)) {
      toast.error("Please select a valid account type.");
      return;
    }

    try {
      const { data, error } = await signUp.email({
        name,
        email,
        password,
        role,
      });

      console.log(data, error);

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Registration successful!");

      router.push("/sign-in");
    } catch (error) {
      toast.error(error.message || "Registration failed.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Create an Account
          </CardTitle>

          <CardDescription>
            Join WedPlan and start your journey.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleRegister} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
                minLength={8}
                required
              />
            </div>

            <div className="space-y-3">
              <Label>Select Account Type</Label>

              <RadioGroup
                name="role"
                defaultValue="customer"
                className="grid grid-cols-2 gap-3"
              >
                <Label
                  htmlFor="customer"
                  className="flex cursor-pointer items-center gap-2 rounded-lg border p-4"
                >
                  <RadioGroupItem value="customer" id="customer" />
                  Customer
                </Label>

                <Label
                  htmlFor="vendor"
                  className="flex cursor-pointer items-center gap-2 rounded-lg border p-4"
                >
                  <RadioGroupItem value="vendor" id="vendor" />
                  Vendor
                </Label>
              </RadioGroup>
            </div>

            <Button type="submit" className="w-full">
              Create Account
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-semibold text-primary hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
