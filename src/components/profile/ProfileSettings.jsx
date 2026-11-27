"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  Loader2,
  Mail,
  MapPin,
  Phone,
  Save,
  Upload,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { authClient, useSession } from "@/app/lib/auth-client";
import { uploadImageToImgBB, validateImageFile } from "@/lib/upload-image";

const ROLE_LABEL = {
  admin: "Administrator",
  vendor: "Vendor",
  customer: "Customer",
};

export default function ProfileSettings() {
  const { data: session, isPending, refetch } = useSession();
  const user = session?.user;

  const fileInputRef = useRef(null);
  const initializedFor = useRef(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    bio: "",
  });
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user || initializedFor.current === user.id) return;

    initializedFor.current = user.id;
    setForm({
      name: user.name || "",
      phone: user.phone || "",
      city: user.city || "",
      bio: user.bio || "",
    });
    setImage(user.image || "");
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handlePhotoChange = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    const validationError = validateImageFile(file);

    if (validationError) {
      toast.error(validationError);
      return;
    }

    setUploading(true);

    try {
      const url = await uploadImageToImgBB(file);
      setImage(url);
      toast.success("Photo uploaded. Save changes to apply it.");
    } catch (error) {
      toast.error(error.message || "Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      toast.error("Full name is required.");
      return;
    }

    setSaving(true);

    try {
      const { error } = await authClient.updateUser({
        name: form.name.trim(),
        image: image || undefined,
        phone: form.phone.trim(),
        city: form.city.trim(),
        bio: form.bio.trim(),
      });

      if (error) {
        throw new Error(error.message || "Failed to update profile");
      }

      await refetch?.();
      toast.success("Profile updated successfully.");
    } catch (error) {
      toast.error(error.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center p-10 text-muted-foreground">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-10 text-center text-muted-foreground">
        Please sign in to view your profile.
      </div>
    );
  }

  const role = String(user.role || "customer").toLowerCase();
  const roleLabel = ROLE_LABEL[role] || "Customer";

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your personal information and public profile.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Profile Photo</CardTitle>
            <CardDescription>
              Upload a profile photo using ImgBB. PNG, JPG and WebP up to 5MB.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <Avatar className="h-24 w-24 border">
              {image ? (
                <AvatarImage src={image} alt={form.name || "Profile photo"} />
              ) : null}

              <AvatarFallback className="text-2xl">
                {form.name?.charAt(0)?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="capitalize">{roleLabel}</Badge>

                <span className="text-sm text-muted-foreground">
                  {user.email}
                </span>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={handlePhotoChange}
              />

              <Button
                type="button"
                variant="outline"
                disabled={uploading}
                onClick={() => fileInputRef.current?.click()}
              >
                {uploading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="mr-2 h-4 w-4" />
                )}
                {uploading ? "Uploading..." : "Change Photo"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Update your personal details.</CardDescription>
          </CardHeader>

          <CardContent className="grid gap-5">
            <div className="space-y-2">
              <Label htmlFor="profile-name">
                <User className="mr-1 inline h-4 w-4" />
                Full Name
              </Label>
              <Input
                id="profile-name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="profile-email">
                <Mail className="mr-1 inline h-4 w-4" />
                Email Address
              </Label>
              <Input
                id="profile-email"
                value={user.email || ""}
                disabled
                readOnly
              />
              <p className="text-xs text-muted-foreground">
                Your email address cannot be changed here.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="profile-phone">
                  <Phone className="mr-1 inline h-4 w-4" />
                  Phone Number
                </Label>
                <Input
                  id="profile-phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+880 1xxx-xxxxxx"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profile-city">
                  <MapPin className="mr-1 inline h-4 w-4" />
                  City / Location
                </Label>
                <Input
                  id="profile-city"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="e.g. Dhaka, Bangladesh"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="profile-bio">Bio / About</Label>
              <Textarea
                id="profile-bio"
                name="bio"
                value={form.bio}
                onChange={handleChange}
                placeholder="Tell us a little about yourself..."
                rows={4}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={saving || uploading}>
                {saving ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
