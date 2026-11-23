import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const services = [
  {
    name: "Wedding Photography",
    category: "Photography",
    status: "approved",
    price: 25000,
  },
  {
    name: "Premium Catering",
    category: "Food",
    status: "pending",
    price: 50000,
  },
];

export default function ServicesPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Manage Services</h1>

      <div className="grid gap-5 md:grid-cols-2">
        {services.map((service) => (
          <Card key={service.name}>
            <CardContent className="p-6 space-y-3">
              <h2 className="text-xl font-bold">{service.name}</h2>

              <p>Category: {service.category}</p>

              <p>Price: ৳ {service.price}</p>

              <Badge>{service.status}</Badge>

              <div className="flex gap-3 pt-3">
                <Button>Approve</Button>

                <Button variant="destructive">Reject</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
