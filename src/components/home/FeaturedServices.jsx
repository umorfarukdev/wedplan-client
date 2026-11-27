import { getFeaturedServices } from "@/lib/api/services";
import ServiceCard from "../services/ServiceCard";

const FeaturedServices = async () => {
  const services = await getFeaturedServices();
  console.log(services);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="mb-8 text-3xl font-bold">
          Featured Wedding Services
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service._id}
              service={service}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;