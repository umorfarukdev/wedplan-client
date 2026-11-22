"use client";

import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

export default function HeroSection() {
  const router = useRouter();

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative flex min-h-[600px] items-center justify-center overflow-hidden bg-gray-100 px-4 dark:bg-gray-900"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-orange-500/10 to-yellow-500/10" />

      <div className="relative mx-auto max-w-3xl text-center">
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          Craft Your Unforgettable
          <br />
          <span className="italic text-rose-500">
            Wedding Celebration
          </span>
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
          Discover vetted wedding photographers, luxury venues,
          florists, caterers, and stylists. Plan and book your
          dream celebration in one place.
        </p>

        <Button
          size="lg"
          className="mt-8 bg-rose-500 px-8 text-white hover:bg-rose-600"
          onClick={() => router.push("/services")}
        >
          Explore Wedding Services
          <Heart className="ml-2 size-4" />
        </Button>
      </div>
    </motion.section>
  );
}