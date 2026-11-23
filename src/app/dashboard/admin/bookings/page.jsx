import { Card, CardContent } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

const bookings = [
  {
    customer: "Umar",
    service: "Photography",
    date: "2026-12-20",
    status: "pending",
  },
];

export default function BookingPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Manage Bookings</h1>

      <Card>
        <CardContent className="p-6">
          {bookings.map((item) => (
            <div
              key={item.customer}
              className="border rounded-xl p-4 flex justify-between"
            >
              <div>
                <h3 className="font-bold">{item.customer}</h3>

                <p>{item.service}</p>

                <p>{item.date}</p>
              </div>

              <Badge>{item.status}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
