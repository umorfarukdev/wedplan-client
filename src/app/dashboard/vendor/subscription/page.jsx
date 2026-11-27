import Link from "next/link";

import { CheckCircle, Crown, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { requireRole } from "@/app/lib/session";
import { getVendorOverview } from "@/lib/api/vendor";

const FREE_PLAN_LIMIT = 3;

export default async function VendorSubscriptionPage({ searchParams }) {
  const session = await requireRole(["vendor"], "/dashboard/vendor/subscription");
  const user = session.user;
  const { canceled } = await searchParams;

  let overview = null;

  try {
    overview = await getVendorOverview(user.id);
  } catch (error) {
    console.error("Subscription overview error:", error);
  }

  const isPremium = user.subscriptionPlan === "premium";
  const activeServices =
    overview?.activeServices ?? overview?.totalServices ?? 0;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Subscription</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your WedPlan vendor plan and service limits.
        </p>
      </div>

      {canceled === "true" && (
        <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-700">
          Payment was canceled. Your current plan has not changed.
        </div>
      )}

      <Card className="rounded-2xl">
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-amber-500" />
                Current Plan
              </CardTitle>
              <CardDescription>
                Active services: {activeServices}
                {isPremium ? " (unlimited)" : ` / ${FREE_PLAN_LIMIT}`}
              </CardDescription>
            </div>

            <Badge className="capitalize">
              {isPremium ? "Premium" : "Free"}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {isPremium
              ? "You can publish unlimited active wedding services."
              : `The Free plan allows up to ${FREE_PLAN_LIMIT} active services. Upgrade to Premium to publish unlimited services.`}
          </p>

          <div className="flex flex-wrap gap-3">
            {isPremium ? (
              <Link
                href="/dashboard/vendor/my-services"
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Manage My Services
              </Link>
            ) : (
              <form action="/api/checkout_sessions" method="POST">
                <Button type="submit">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Upgrade to Premium
                </Button>
              </form>
            )}

            <Link
              href="/dashboard/vendor/add-service"
              className="inline-flex items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium hover:bg-accent"
            >
              Add a Service
            </Link>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Plan Benefits</CardTitle>
        </CardHeader>

        <CardContent>
          <ul className="space-y-3 text-sm">
            {[
              "Unlimited active wedding service listings",
              "Priority placement in search results",
              "Unlimited booking requests",
              "Dedicated vendor support",
            ].map((benefit) => (
              <li key={benefit} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                {benefit}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
