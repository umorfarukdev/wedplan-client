import { CreditCard } from "lucide-react";

export default function Transactions() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Transactions</h1>

      <p className="text-muted-foreground mt-2">Monitor payments</p>

      <div className="mt-8 rounded-xl border p-10 text-center">
        <CreditCard className="mx-auto h-12 w-12" />

        <p className="mt-4">Payment history coming soon</p>
      </div>
    </div>
  );
}
