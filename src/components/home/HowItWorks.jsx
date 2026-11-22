"use client";
import {
  Heart,
  BriefcaseBusiness,
  CheckCircle,
} from "lucide-react";
import { motion } from "motion/react";

const steps = [
  {
    title: "Search & Discover",
    description:
      "Browse wedding vendors by category, location, and budget. Find your perfect match.",
    icon: Heart,
  },
  {
    title: "Compare & Request",
    description:
      "Compare package prices and services. Send a booking request with your wedding date and location.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Book & Celebrate",
    description:
      "Receive responses from vendors and keep your confirmed services organized in your dashboard.",
    icon: CheckCircle,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="mb-12 text-center text-3xl font-bold sm:text-4xl">
          How WedPlan Works
        </h2>

        <div className="space-y-6">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 rounded-xl border bg-card p-6 shadow-sm"
              >
                <div className="rounded-xl bg-rose-500/10 p-3">
                  <Icon className="size-6 text-rose-500" />
                </div>

                <div>
                  <h3 className="mb-1 text-lg font-semibold">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}