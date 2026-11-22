"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";

const featuredServices = [
  {
    id: 1,
    name: "Elegant Photography",
    category: "Photography & Videography",
    price: "$2,500",
    location: "London, UK",
  },
  {
    id: 2,
    name: "Garden Venue",
    category: "Wedding Venues",
    price: "$4,500",
    location: "Countryside, UK",
  },
  {
    id: 3,
    name: "Floral Arrangements",
    category: "Decoration & Florist",
    price: "$1,800",
    location: "Manchester, UK",
  },
  {
    id: 4,
    name: "Gourmet Catering",
    category: "Catering Services",
    price: "$6,200",
    location: "Birmingham, UK",
  },
  {
    id: 5,
    name: "Bridal Makeup",
    category: "Makeup & Styling",
    price: "$1,200",
    location: "London, UK",
  },
  {
    id: 6,
    name: "Wedding Dress",
    category: "Wedding Fashion",
    price: "$3,800",
    location: "London, UK",
  },
];

export default function FeaturedServices() {
  const router = useRouter();

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Featured Wedding Services
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Hand-picked vendors ready to bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="h-full overflow-hidden">
                <CardHeader className="p-0">
                  <div className="relative flex h-48 items-start bg-gradient-to-br from-rose-100 to-orange-100 p-3">
                    <Badge variant="secondary">
                      {service.category}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-5">
                  <h3 className="mb-2 text-lg font-semibold">
                    {service.name}
                  </h3>

                  <p className="mb-4 text-sm text-muted-foreground">
                    {service.location}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-rose-500">
                        {service.price}
                      </span>
                      <Badge variant="outline">Verified</Badge>
                    </div>

                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() =>
                        router.push(`/services?service=${service.id}`)
                      }
                    >
                      <ArrowRight className="size-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Button
          variant="outline"
          className="mt-12 w-full"
          onClick={() => router.push("/services")}
        >
          View All Services
          <ArrowRight className="ml-2 size-4" />
        </Button>
      </div>
    </section>
  );
}