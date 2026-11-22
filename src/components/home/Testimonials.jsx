"use client";

import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const testimonials = [
  {
    name: "Sophia & Liam Harrison",
    location: "Napa Valley, CA",
    text: "WedPlan helped us find our dream garden estate, floral designer, and photographer in a single weekend.",
  },
  {
    name: "Amara & Daniel Vance",
    location: "Austin, TX",
    text: "Comparing vendors and pricing saved us weeks of back-and-forth emails.",
  },
  {
    name: "Clara & Ethan Brooks",
    location: "Charleston, SC",
    text: "WedPlan connected us with verified vendors who understood our vision.",
  },
];

export default function Testimonials({ showTestimonials = true }) {
  return (
    <AnimatePresence>
      {showTestimonials && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="py-24"
        >
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="mb-12 text-center text-3xl font-bold sm:text-4xl">
              Customer Testimonials
            </h2>

            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((item) => (
                <div
                  key={item.name}
                  className="rounded-2xl border bg-card p-6 shadow-sm"
                >
                  <p className="mb-4 leading-relaxed">{item.text}</p>

                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-rose-500/10 p-3">
                      <Heart className="size-5 text-rose-500" />
                    </div>

                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}