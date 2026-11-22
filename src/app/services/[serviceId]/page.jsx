import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CalendarDays, CheckCircle2, MapPin, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getServiceById } from '@/lib/api/services';

const ServiceDetailsPage = async ({ params }) => {
  const { serviceId } = await params;

  const service = await getServiceById(serviceId);
  console.log(service);

  const {
    serviceName,
    category,
    description,
    price,
    location,
    images = [],
  } = service;
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10">
        {/* Back Button */}
        <Link
          href="/services"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-rose-600"
        >
          <ArrowLeft className="size-4" />
          Back to Services
        </Link>

        <div className="grid gap-10 lg:grid-cols-3">
          {/* Left Side */}
          <div className="space-y-6 lg:col-span-2">
            {/* Main Image */}
            <div className="relative h-[300px] overflow-hidden rounded-2xl sm:h-[450px]">
              <Image
                src={images[0] || "/placeholder.jpg"}
                alt={serviceName}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
              />

              <Badge className="absolute left-5 top-5 bg-white text-gray-900">
                {category}
              </Badge>
            </div>

            {/* Additional Images */}
            {images.length > 1 && (
              <div className="grid grid-cols-3 gap-4">
                {images.slice(1).map((image, index) => (
                  <div
                    key={index}
                    className="relative h-28 overflow-hidden rounded-xl sm:h-40"
                  >
                    <Image
                      src={image}
                      alt={`${serviceName} ${index + 2}`}
                      fill
                      sizes="(max-width: 768px) 33vw, 250px"
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Service Information */}
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-wider text-rose-600">
                  {category}
                </p>

                <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                  {serviceName}
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <MapPin className="size-4 text-rose-500" />
                  {location}
                </span>

                <span className="flex items-center gap-2">
                  <Tag className="size-4 text-rose-500" />
                  {category}
                </span>
              </div>

              <div className="border-t pt-6">
                <h2 className="mb-3 text-xl font-semibold">
                  About This Service
                </h2>

                <p className="leading-8 text-muted-foreground">{description}</p>
              </div>
            </div>
          </div>

          {/* Right Side - Booking Card */}
          <div>
            <Card className="sticky top-24 rounded-2xl shadow-md">
              <CardHeader>
                <CardTitle>Service Information</CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Price */}
                <div>
                  <p className="text-sm text-muted-foreground">
                    Starting Price
                  </p>

                  <p className="mt-1 text-3xl font-bold text-rose-600">
                    ৳{Number(price).toLocaleString("en-BD")}
                  </p>
                </div>

                <div className="border-t" />

                {/* Details */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="size-5 text-green-600" />
                    <span className="text-sm">Professional Service</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="size-5 text-rose-500" />
                    <span className="text-sm">{location}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <CalendarDays className="size-5 text-rose-500" />
                    <span className="text-sm">Booking Available</span>
                  </div>
                </div>

                <div className="border-t" />

                {/* Booking Button */}
                <Button
                  asChild
                  className="h-12 w-full bg-rose-600 text-base text-white hover:bg-rose-700"
                >
                  <Link href={`/booking?serviceId=${service._id}`}>
                    Book This Service
                  </Link>
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  Contact us to make your special day memorable.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ServiceDetailsPage;
