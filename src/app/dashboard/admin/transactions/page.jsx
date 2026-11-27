import { CreditCard } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAdminTransactions } from "@/lib/api/admin";

export const dynamic = "force-dynamic";

const formatDate = (value) => {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default async function TransactionsPage() {
  let transactions = [];
  let error = null;

  try {
    const data = await getAdminTransactions();
    transactions = Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Transactions error:", err);
    error = err.message || "Failed to load transactions";
  }

  const totalAmount = transactions.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0,
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Transactions</h1>
        <p className="mt-2 text-muted-foreground">
          Monitor vendor subscription payments.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Total Transactions</p>
              <h2 className="mt-2 text-3xl font-bold">{transactions.length}</h2>
            </div>
            <CreditCard className="h-9 w-9 text-primary" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <h2 className="mt-2 text-3xl font-bold">
                ${totalAmount.toLocaleString("en-US")}
              </h2>
            </div>
            <CreditCard className="h-9 w-9 text-primary" />
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          {error ? (
            <div className="p-10 text-center text-sm text-red-500">{error}</div>
          ) : transactions.length === 0 ? (
            <div className="p-10 text-center text-muted-foreground">
              <CreditCard className="mx-auto mb-4 h-12 w-12" />
              <p>No transactions yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/60">
                    <TableHead>Vendor</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction._id}>
                      <TableCell>
                        <p className="font-medium">
                          {transaction.vendorName ||
                            transaction.customerEmail ||
                            "Vendor"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {transaction.vendorId}
                        </p>
                      </TableCell>

                      <TableCell className="capitalize">
                        {transaction.plan || "premium"}
                      </TableCell>

                      <TableCell className="font-medium">
                        {transaction.currency === "usd" ? "$" : "৳"}
                        {Number(transaction.amount || 0).toLocaleString("en-US")}
                      </TableCell>

                      <TableCell>
                        <Badge className="capitalize">
                          {transaction.status || "paid"}
                        </Badge>
                      </TableCell>

                      <TableCell>{formatDate(transaction.createdAt)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
