"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

import { signUp } from "@/app/lib/auth-client";

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
import { Separator } from "@/components/ui/separator";

import GoogleSign from "@/components/shared/GoogleSign";

export default function RegisterPage() {
  const router = useRouter();

  const [role, setRole] = useState("customer");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadImage = async () => {
    if (!image) return "";

    const formData = new FormData();
    formData.append("image", image);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      },
    );

    const result = await response.json();

    if (!result.success) {
      throw new Error("Image upload failed.");
    }

    return result.data.url;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const { name, email, password } = Object.fromEntries(formData.entries());

    if (!["customer", "vendor"].includes(role)) {
      toast.error("Please select a valid account type.");
      return;
    }

    try {
      setLoading(true);

      let imageUrl = "";

      if (image) {
        imageUrl = await uploadImage();
      }

      const { error } = await signUp.email({
        name,
        email,
        password,
        role,
        image: imageUrl,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Registration successful!");

      router.push("/sign-in");
    } catch (err) {
      toast.error(err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create an Account</CardTitle>

          <CardDescription>
            Join WedPlan and start your journey.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleRegister} className="space-y-5">
            <div className="flex justify-center">
              <label htmlFor="image" className="cursor-pointer">
                {preview ? (
                  <Image
                    src={preview}
                    alt="Preview"
                    width={100}
                    height={100}
                    className="h-24 w-24 rounded-full border object-cover"
                  />
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-dashed text-sm text-gray-500">
                    Upload
                  </div>
                )}
              </label>

              <input
                id="image"
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  setImage(file);
                  setPreview(URL.createObjectURL(file));
                }}
              />
            </div>

            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input name="name" placeholder="Enter your name" required />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                minLength={8}
                placeholder="Enter password"
                required
              />
            </div>

            <div className="space-y-3">
              <Label>Account Type</Label>

              <RadioGroup
                value={role}
                onValueChange={setRole}
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

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </Button>

            <Separator />

            <GoogleSign role={role} className="w-full" />

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
