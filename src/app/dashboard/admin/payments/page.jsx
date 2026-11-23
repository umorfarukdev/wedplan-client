import { Card, CardContent } from "@/components/ui/card";

export default function PaymentsPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Transactions</h1>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between border-b py-4">
            <span>Booking #1001</span>

            <span>৳25000</span>
          </div>

          <div className="flex justify-between py-4">
            <span>Booking #1002</span>

            <span>৳50000</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
