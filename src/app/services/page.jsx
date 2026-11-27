import ServiceCard from "@/components/services/ServiceCard";
import { Search } from "lucide-react";
import { getCustomerServices } from "@/lib/api/customer";

const BrowseServicesPage = async () => {
  const services = await getCustomerServices();

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b bg-rose-50/50 py-16 dark:bg-rose-950/10">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-rose-600">
            Discover Your Perfect Match
          </span>

          <h1 className="text-3xl font-bold sm:text-5xl">
            Explore Wedding Services
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Find trusted wedding professionals and make your special day
            unforgettable with WedPlan.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">All Services</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Find the perfect services for your wedding.
            </p>
          </div>

          <p className="text-sm text-muted-foreground">
            {services?.length || 0} Services Available
          </p>
        </div>

        {services?.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-20 text-center">
            <Search className="mb-4 size-12 text-muted-foreground" />

            <h3 className="text-xl font-semibold">No Services Found</h3>

            <p className="mt-2 text-sm text-muted-foreground">
              There are no available wedding services right now.
            </p>
          </div>
        )}
      </section>
    </main>
  );
};

export default BrowseServicesPage;
