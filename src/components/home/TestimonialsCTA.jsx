"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Testimonials from "./Testimonials";

export default function TestimonialsCTA() {
  const [showTestimonials, setShowTestimonials] = useState(false);

  return (
    <>
      <div className="bg-gradient-to-b from-rose-50 to-rose-100 py-8 dark:from-rose-950 dark:to-rose-900">
        <div className="mx-auto max-w-2xl px-4">
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => setShowTestimonials((prev) => !prev)}
          >
            {showTestimonials
              ? "Close Testimonials"
              : "Read Customer Stories"}
          </Button>
        </div>
      </div>

      <Testimonials showTestimonials={showTestimonials} />
    </>
  );
}