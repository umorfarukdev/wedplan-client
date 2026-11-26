import { stripe } from "@/app/lib/stripe";
import { redirect } from "next/navigation";
import { CheckCircle, Mail } from "lucide-react";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Missing Stripe session_id");
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  const { status, customer_details, payment_intent, metadata } = session;

  // Payment not completed
  if (status !== "complete") {
    return redirect("/checkout?plan=premium");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <section className="w-full max-w-lg rounded-2xl border bg-white p-8 text-center shadow-sm">
        <div className="mb-6 flex justify-center">
          <CheckCircle className="size-20 text-green-600" />
        </div>

        <h1 className="text-3xl font-bold">Payment Successful 🎉</h1>

        <p className="mt-4 text-muted-foreground">
          Thank you for upgrading to Premium. Your vendor account has been
          upgraded successfully.
        </p>

        <div className="mt-6 rounded-xl bg-muted p-4 text-left">
          <div className="flex items-center gap-2">
            <Mail className="size-5 text-rose-600" />

            <span className="font-medium">Confirmation Email</span>
          </div>

          <p className="mt-2 text-sm text-muted-foreground">
            A confirmation email will be sent to:
          </p>

          <p className="mt-1 font-semibold">{customer_details?.email}</p>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          If you have any questions, please contact:
        </p>

        <a
          href="mailto:orders@example.com"
          className="mt-2 inline-block text-rose-600 hover:underline"
        >
          orders@example.com
        </a>

        <a
          href="/dashboard/vendor/overview"
          className="mt-8 block rounded-lg bg-rose-600 px-5 py-3 font-semibold text-white hover:bg-rose-700"
        >
          Go to Vendor Dashboard
        </a>
      </section>
    </main>
  );
}
