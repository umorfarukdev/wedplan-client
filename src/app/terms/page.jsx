import Link from "next/link";

export const metadata = {
  title: "Terms of Service | WedPlan",
};

export default function TermsPage() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold">Terms of Service</h1>
      <p className="mt-3 text-muted-foreground">
        Please read these terms before using WedPlan.
      </p>

      <div className="mt-8 space-y-6 text-sm leading-7 text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground">Accounts</h2>
          <p className="mt-2">
            You are responsible for the accuracy of your account information and
            for keeping your login credentials secure. Accounts may be blocked
            if they violate these terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            Vendors and services
          </h2>
          <p className="mt-2">
            Vendors are responsible for the services they publish. Service
            listings are reviewed by administrators before appearing publicly.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Bookings</h2>
          <p className="mt-2">
            Booking requests are agreements between customers and vendors.
            WedPlan provides the platform but is not a party to those
            agreements.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Payments</h2>
          <p className="mt-2">
            Vendor subscription payments are processed securely by our payment
            provider. Subscription benefits are applied after payment is
            verified.
          </p>
        </section>
      </div>

      <Link
        href="/"
        className="mt-10 inline-flex rounded-md bg-rose-600 px-5 py-2 text-sm font-medium text-white hover:bg-rose-700"
      >
        Back to home
      </Link>
    </main>
  );
}
