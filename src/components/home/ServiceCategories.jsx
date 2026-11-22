"use client";

import { useRouter } from "next/navigation";
import { Palette, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

const categories = [
  "Photography & Videography",
  "Wedding Venues",
  "Decoration & Florist",
  "Catering Services",
  "Makeup & Styling",
  "Wedding Fashion",
];

export default function ServiceCategories() {
  const router = useRouter();

  return (
    <section className="bg-muted/50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Wedding Service Categories
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Browse specialists by category to find exactly what you need.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() =>
                router.push(
                  `/services?category=${encodeURIComponent(category)}`
                )
              }
              className="flex items-center gap-4 rounded-xl border bg-card p-5 text-left shadow-sm transition hover:border-rose-400 hover:shadow-lg"
            >
              <div className="rounded-xl bg-rose-500/10 p-3">
                <Palette className="size-6 text-rose-500" />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold">{category}</h3>
                <p className="text-sm text-muted-foreground">
                  Find {category.toLowerCase()}
                </p>
              </div>

              <ArrowRight className="size-4" />
            </motion.button>
          ))}
        </div>

        <Button
          variant="outline"
          className="mt-12 w-full"
          onClick={() => router.push("/services")}
        >
          Browse All Categories
          <ArrowRight className="ml-2 size-4" />
        </Button>
      </div>
    </section>
  );
}