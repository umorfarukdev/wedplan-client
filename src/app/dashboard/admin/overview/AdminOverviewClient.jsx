"use client";

import {
  Users,
  BriefcaseBusiness,
  ClipboardList,
  CalendarDays,
  CreditCard,
  UserRoundCheck,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const AdminOverviewClient = ({ data }) => {
  const stats = [
    {
      title: "Total Users",
      value: data.totalUsers,
      icon: Users,
    },

    {
      title: "Total Vendors",
      value: data.totalVendors,
      icon: BriefcaseBusiness,
    },

    {
      title: "Total Customers",
      value: data.totalCustomers,
      icon: UserRoundCheck,
    },

    {
      title: "Total Services",
      value: data.totalServices,
      icon: ClipboardList,
    },

    {
      title: "Pending Services",
      value: data.pendingServices,
      icon: CalendarDays,
    },

    {
      title: "Transactions",
      value: data.totalTransactions,
      icon: CreditCard,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Overview</h1>

        <p className="text-muted-foreground">
          Monitor WedPlan platform activity
        </p>
      </div>

      <div
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.title}>
              <CardContent
                className="flex items-center justify-between p-6"
              >
                <div>
                  <p className="text-sm text-muted-foreground">{item.title}</p>

                  <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
                </div>

                <Icon
                  className="h-10 w-10 text-primary"
                />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AdminOverviewClient;
