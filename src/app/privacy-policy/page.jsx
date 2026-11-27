import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | WedPlan",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <p className="mt-3 text-muted-foreground">
        Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long" })}
      </p>

      <div className="mt-8 space-y-6 text-sm leading-7 text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground">
            Information we collect
          </h2>
          <p className="mt-2">
            WedPlan collects the account details you provide, such as your name,
            email address, phone number, city and profile bio. Vendors may also
            upload service information and images.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            How we use your information
          </h2>
          <p className="mt-2">
            We use your information to operate your account, connect customers
            with vendors, process booking requests, and improve the platform.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            Data storage
          </h2>
          <p className="mt-2">
            Account data is stored securely. Uploaded images may be hosted by
            third-party image providers. Payment processing is handled by our
            payment provider.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Contact</h2>
          <p className="mt-2">
            For privacy questions, contact{" "}
            <a href="mailto:support@wedplan.com" className="text-rose-600 hover:underline">
              support@wedplan.com
            </a>
            .
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
