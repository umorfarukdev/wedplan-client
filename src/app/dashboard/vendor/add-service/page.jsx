
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import {
  Upload,
  X,
  ImagePlus,
  Loader2,
  ArrowLeft,
} from "lucide-react";

import Link from "next/link";

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
import { createService } from "@/lib/actions/service";


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
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const AddServicePage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    serviceName: "",
    category: "",
    price: "",
    location: "",
    description: "",
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Select images
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);

    if (images.length + selectedFiles.length > MAX_IMAGES) {
      toast.error("You can upload a maximum of 6 images.");
      e.target.value = "";
      return;
    }

    const validFiles = [];

    for (const file of selectedFiles) {
      if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
        toast.error(`${file.name}: Only PNG, JPG and WebP are allowed.`);
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name}: Image size must be under 5MB.`);
        continue;
      }

      validFiles.push(file);
    }

    setImages((prev) => [...prev, ...validFiles]);
    e.target.value = "";
  };

  // Remove image
  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Upload image to ImgBB
  const uploadImage = async (file) => {
    const formData = new FormData();

    formData.append("image", file);

    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

    if (!apiKey) {
      throw new Error("ImgBB API key is missing.");
    }

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error("Image upload failed.");
    }

    return data.data.url;
  };

  // Submit service
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      toast.error("Please upload at least one service image.");
      return;
    }
    setLoading(true);

    try {
      // Upload all images to ImgBB
      const uploadedImages = await Promise.all(
        images.map((image) => uploadImage(image))
      );

      const serviceData = {
        ...formData,
        price: Number(formData.price),
        images: uploadedImages,
      };

      await createService(serviceData, token);

      toast.success("Service submitted for admin review!");

      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-muted/30 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6">

        {/* Header */}
        <div className="space-y-3">
          <Link
            href="/dashboard/vendor/services"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-rose-600"
          >
            <ArrowLeft className="size-4" />
            Back to My Services
          </Link>

          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Add New Wedding Service
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Publish a new wedding package. Submissions start as
              Pending until reviewed by an administrator.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Service Details</CardTitle>
              <CardDescription>
                Provide clear pricing, location coverage, and
                high-resolution photographs.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">

              {/* Service Name */}
              <div className="space-y-2">
                <Label htmlFor="serviceName">
                  Service Name *
                </Label>

                <Input
                  id="serviceName"
                  name="serviceName"
                  placeholder="e.g. Premium Wedding Photography"
                  value={formData.serviceName}
                  onChange={handleChange}
                  required
                  minLength={3}
                  maxLength={100}
                />
              </div>

              {/* Category and Price */}
              <div className="grid gap-5 sm:grid-cols-2">

                <div className="space-y-2">
                  <Label htmlFor="category">
                    Service Category *
                  </Label>

                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-rose-500"
                  >
                    <option value="" disabled>
                      Select a category
                    </option>

                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">
                    Starting Price (USD) *
                  </Label>

                  <Input
                    id="price"
                    name="price"
                    type="number"
                    placeholder="2500"
                    min="1"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">
                  Location / Coverage Area *
                </Label>

                <Input
                  id="location"
                  name="location"
                  placeholder="e.g. Dhaka, Bangladesh"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">
                  Service Description *
                </Label>

                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your wedding service, packages, features and experience..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                  minLength={20}
                  rows={6}
                  className="resize-none"
                />

                <p className="text-right text-xs text-muted-foreground">
                  {formData.description.length} characters
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Image Upload */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Service Images</CardTitle>
              <CardDescription>
                Upload up to 6 high-quality photographs.
                The first image will be your cover image.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">

              <label
                htmlFor="serviceImages"
                className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/30 bg-muted/30 px-6 py-10 text-center transition hover:border-rose-500 hover:bg-rose-50/50"
              >
                <div className="mb-4 rounded-full bg-rose-100 p-4">
                  <ImagePlus className="size-7 text-rose-600" />
                </div>

                <p className="font-semibold">
                  <Upload className="mr-2 inline size-4" />
                  Select Image Files
                </p>

                <p className="mt-2 text-xs text-muted-foreground">
                  PNG, JPG, or WebP up to 5MB each
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {images.length} / 6 images selected
                </p>

                <input
                  id="serviceImages"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  multiple
                  onChange={handleImageChange}
                  disabled={images.length >= MAX_IMAGES}
                  className="hidden"
                />
              </label>

              {/* Image Preview */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {images.map((image, index) => (
                    <div
                      key={`${image.name}-${index}`}
                      className="group relative aspect-[4/3] overflow-hidden rounded-xl border"
                    >
                      <Image
                        src={URL.createObjectURL(image)}
                        alt={`Service image ${index + 1}`}
                        fill
                        unoptimized
                        className="object-cover"
                      />

                      {index === 0 && (
                        <span className="absolute bottom-2 left-2 rounded-md bg-rose-600 px-2 py-1 text-xs font-medium text-white">
                          Cover Image
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute right-2 top-2 rounded-full bg-black/70 p-1.5 text-white transition hover:bg-red-600"
                        aria-label="Remove image"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={loading}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={loading}
              className="bg-rose-600 text-white hover:bg-rose-700"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                "Publish Service for Review"
              )}
            </Button>
          </div>

        </form>
      </div>
    </main>
  );
};

export default AddServicePage;
