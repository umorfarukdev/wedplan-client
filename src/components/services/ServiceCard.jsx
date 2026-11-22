import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowUpRight, Tag } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const ServiceCard = ({ service }) => {
  const {
    _id,
    serviceName,
    category,
    description,
    price,
    location,
    images = [],
  } = service;


  const image = images[0] || "/placeholder.jpg";

  return (
    <Card className="group overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Service Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={image}
          alt={serviceName}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <Badge className="absolute left-4 top-4 bg-white text-gray-900 hover:bg-white">
          {category}
        </Badge>
      </div>

      {/* Service Information */}
      <CardContent className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-1 text-lg font-semibold">{serviceName}</h3>

          <span className="shrink-0 text-lg font-bold text-rose-600">
            ৳{Number(price).toLocaleString("en-BD")}
          </span>
        </div>

        <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
          {description}
        </p>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="size-4 text-rose-500" />
          <span className="line-clamp-1">{location}</span>
        </div>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="px-5 pb-5 pt-0">
        <Link href={`/services/${_id}`} 
          className="w-full bg-rose-600 text-white hover:bg-rose-700"
        >
          View Details
          <ArrowUpRight className="size-4" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
