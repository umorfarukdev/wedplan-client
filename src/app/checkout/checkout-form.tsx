
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "cn";

const CURRENCIES = [
  { code: "BDT", flag: "🇧🇩" },
  { code: "USD", flag: "🇺🇸" },
] as const;

/* Plan-aware pricing — "pro" (Hireloop Pro, $20) or "recruiter"
   (unlimited job posts after a one-time $80 payment). */
const PLANS = {
  pro: {
    name: "Hireloop Pro Plan",
    description: "Access to all features",
    prices: { BDT: "BDT 2,553.33", USD: "$20.00" },
  },
  recruiter: {
    name: "Recruiter Unlimited Plan",
    description: "Post unlimited jobs after this one-time payment",
    prices: { BDT: "BDT 10,213.32", USD: "$80.00" },
  },
} as const;

type Plan = keyof typeof PLANS;

export default function CheckoutForm({ plan = "pro" }: { plan?: Plan }) {
  const [currency, setCurrency] = useState<"BDT" | "USD">("BDT");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [saveInfo, setSaveInfo] = useState(false);

  const activePlan = PLANS[plan] ?? PLANS.pro;
  const activePrice = activePlan.prices[currency];

  return (
    <div className="grid gap-6 lg:grid-cols-2">

      {/* Order Summary */}
      <section className="h-fit space-y-5 rounded-xl border bg-card p-5">

        <h2 className="text-sm font-semibold">
          CHOOSE A CURRENCY
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {CURRENCIES.map((item) => (
            <button
              key={item.code}
              type="button"
              onClick={() => setCurrency(item.code)}
              aria-pressed={currency === item.code}
              className={cn(
                "flex flex-col items-start gap-2 rounded-lg border p-3 transition",
                currency === item.code
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "hover:border-muted-foreground/40"
              )}
            >
              <span className="text-sm font-medium">
                {item.flag} {item.code}
              </span>

              <span className="text-lg font-semibold">
                {activePlan.prices[item.code]}
              </span>
            </button>
          ))}
        </div>

        <p className="text-xs text-muted-foreground italic">
          1 USD = 127.6665 BDT
        </p>

        <div className="border-t pt-4">
          <div className="flex justify-between gap-3">
            <div>
              <h3 className="font-semibold">
                {activePlan.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {activePlan.description}
              </p>
            </div>

            <span className="font-semibold">
              {activePrice}
            </span>
          </div>
        </div>
      </section>

      {/* Payment Form */}
      <section className="space-y-5">

        <div className="rounded-xl border bg-card p-5 space-y-4">

          <h2 className="font-semibold">
            Payment Method
          </h2>

          {/* Payment Method Selection */}
          <button
            type="button"
            onClick={() => setPaymentMethod("card")}
            aria-pressed={paymentMethod === "card"}
            className={cn(
              "flex w-full items-center justify-between rounded-lg border p-4 text-left",
              paymentMethod === "card"
                ? "border-primary bg-primary/5"
                : "border-border"
            )}
          >
            <span className="flex items-center gap-3">
              <span className="flex size-4 items-center justify-center rounded-full border-2 border-primary">
                {paymentMethod === "card" && (
                  <span className="size-2 rounded-full bg-primary" />
                )}
              </span>
              <span className="text-sm font-medium">
                Credit or Debit Card
              </span>
            </span>

            <span className="text-xs text-muted-foreground">
              Visa · Mastercard
            </span>
          </button>

          {/* Card Information */}
          {paymentMethod === "card" && (
            <div className="rounded-lg bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">
                Secure card details entry will be provided
                by Stripe Checkout.
              </p>
            </div>
          )}

          {/* Save Information */}
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={saveInfo}
              onChange={(e) => setSaveInfo(e.target.checked)}
              className="mt-1 size-4 accent-primary"
            />

            <span>
              <span className="block text-sm font-medium">
                Save my information
              </span>
              <span className="text-xs text-muted-foreground">
                Save information for faster checkout.
              </span>
            </span>
          </label>
        </div>

        {/* Checkout Button */}
        <form action="/api/checkout_sessions" method="POST">
          <input
            type="hidden"
            name="plan"
            value={plan}
          />

          <input
            type="hidden"
            name="currency"
            value={currency}
          />

          <input
            type="hidden"
            name="saveInfo"
            value={String(saveInfo)}
          />

          <Button type="submit" className="h-12 w-full">
            Pay {activePrice}
          </Button>
        </form>

        <div className="flex justify-center gap-3 pb-4 text-xs text-muted-foreground">
          <span>Powered by Stripe</span>
          <span>·</span>
          <span>Terms</span>
          <span>·</span>
          <span>Privacy</span>
        </div>

      </section>
    </div>
  );
}
