"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ArrowLeft, Loader2, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { updateVendorService } from "@/lib/actions/vendor";
import {
  uploadImageToImgBB,
  validateImageFile,
} from "@/lib/upload-image";

const categories = [
  "Photography & Videography",
  "Wedding Venues",
  "Catering",
  "Wedding Decoration",
  "Bridal Makeup",
  "Wedding Planner",
  "Wedding Dress",
  "Music & Entertainment",
  "Transportation",
  "Other",
];

const MAX_IMAGES = 6;

export default function EditServiceForm({ service }) {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    serviceName: service.serviceName || "",
    category: service.category || "",
    price: service.price ?? "",
    location: service.location || "",
    description: service.description || "",
  });
  const [images, setImages] = useState(
    Array.isArray(service.images) ? service.images : [],
  );
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleAddImage = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    if (images.length >= MAX_IMAGES) {
      toast.error(`You can upload a maximum of ${MAX_IMAGES} images.`);
      return;
    }

    const validationError = validateImageFile(file);

    if (validationError) {
      toast.error(validationError);
      return;
    }

    setUploading(true);

    try {
      const url = await uploadImageToImgBB(file);
      setImages((previous) => [...previous, url]);
      toast.success("Image uploaded. Save changes to apply it.");
    } catch (error) {
      toast.error(error.message || "Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    setImages((previous) => previous.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.serviceName.trim()) {
      toast.error("Service name is required.");
      return;
    }

    if (images.length === 0) {
      toast.error("Please keep at least one service image.");
      return;
    }

    setSaving(true);

    try {
      await updateVendorService(service._id, {
        ...form,
        serviceName: form.serviceName.trim(),
        location: form.location.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        images,
      });

      toast.success("Service updated successfully.");
      router.push("/dashboard/vendor/my-services");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Failed to update service.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="space-y-3">
        <Link
          href="/dashboard/vendor/my-services"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-rose-600"
        >
          <ArrowLeft className="size-4" />
          Back to My Services
        </Link>

        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Edit Service
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Update your service details. Changes are reviewed by an
            administrator when required.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Service Details</CardTitle>
            <CardDescription>Basic information about your service.</CardDescription>
          </CardHeader>

          <CardContent className="grid gap-5">
            <div className="space-y-2">
              <Label htmlFor="serviceName">Service Name</Label>
              <Input
                id="serviceName"
                name="serviceName"
                value={form.serviceName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="h-9 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price (BDT)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={form.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={5}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Service Images</CardTitle>
            <CardDescription>
              PNG, JPG and WebP up to 5MB. Maximum {MAX_IMAGES} images.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {images.map((url, index) => (
                <div
                  key={`${url}-${index}`}
                  className="group relative aspect-[4/3] overflow-hidden rounded-lg border bg-muted"
                >
                  <Image
                    src={url}
                    alt={`Service image ${index + 1}`}
                    fill
                    unoptimized
                    className="object-cover"
                  />

                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute right-2 top-2 rounded-full bg-black/60 p-1 text-white opacity-0 transition group-hover:opacity-100"
                    aria-label="Remove image"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={handleAddImage}
            />

            <Button
              type="button"
              variant="outline"
              disabled={uploading || images.length >= MAX_IMAGES}
              onClick={() => fileInputRef.current?.click()}
            >
              {uploading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Plus className="mr-2 h-4 w-4" />
              )}
              {uploading ? "Uploading..." : "Add Image"}
            </Button>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Link
            href="/dashboard/vendor/my-services"
            className="inline-flex items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium hover:bg-accent"
          >
            Cancel
          </Link>

          <Button type="submit" disabled={saving || uploading}>
            {saving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
