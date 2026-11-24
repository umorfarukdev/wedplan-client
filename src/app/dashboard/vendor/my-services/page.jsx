import Link from "next/link";
import Image from "next/image";
import { headers } from "next/headers";
import { Eye, Pencil, Trash2, Plus, MapPin, CalendarDays } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BASE_URL } from "@/lib/api/base-url";
import { auth } from "@/app/lib/auth";
import {
  deleteVendorService,
  toggleAvailabilityAction,
} from "@/lib/actions/vendor";

const getStatusStyle = (status) => {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-700 hover:bg-green-100";

    case "pending":
      return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100";

    case "rejected":
      return "bg-red-100 text-red-700 hover:bg-red-100";

    case "inactive":
      return "bg-gray-100 text-gray-700 hover:bg-gray-100";

    default:
      return "bg-gray-100 text-gray-700";
  }
};

const MyServicesPage = async () => {
  // Get logged-in vendor from Better Auth
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user?.id || user.role !== "vendor") {
    return (
      <div className="rounded-lg border p-10 text-center">
        <h2 className="text-xl font-semibold">Access Denied</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Only vendors can access their services.
        </p>
      </div>
    );
  }

  // Fetch vendor services
  const response = await fetch(`${BASE_URL}/vendor/services/${user.id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch services");
  }

  const services = await response.json();

  const totalServices = services.length;
  const approvedServices = services.filter(
    (service) => service.status === "approved",
  ).length;
  const pendingServices = services.filter(
    (service) => service.status === "pending",
  ).length;
  const rejectedServices = services.filter(
    (service) => service.status === "rejected",
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Services</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your wedding services, approval status and availability.
          </p>
        </div>

        <Link
          href="/dashboard/vendor/add-service"
          className="inline-flex h-8 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/80"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Service
        </Link>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Total Services", value: totalServices },
          { label: "Approved", value: approvedServices },
          { label: "Pending", value: pendingServices },
          { label: "Rejected", value: rejectedServices },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border bg-card p-5">
            <p className="text-sm text-muted-foreground">{item.label}</p>
            <h2 className="mt-2 text-2xl font-bold">{item.value}</h2>
          </div>
        ))}
      </div>

      {/* Services Table */}
      <div className="overflow-hidden rounded-xl border bg-card">
        <div className="border-b p-5">
          <h2 className="font-semibold">All My Services</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            View and manage your submitted services.
          </p>
        </div>

        {services.length === 0 ? (
          <div className="px-5 py-16 text-center">
            <h3 className="text-lg font-semibold">No Services Found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              You have not created any services yet.
            </p>
            <Link
              href="/dashboard/vendor/services/add"
              className="mt-5 inline-flex h-8 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/80"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Service
            </Link>
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[1050px] text-sm">
              <thead className="bg-muted/50">
                <tr className="text-left">
                  <th className="px-5 py-4 font-medium">Service</th>
                  <th className="px-5 py-4 font-medium">Category</th>
                  <th className="px-5 py-4 font-medium">Price</th>
                  <th className="px-5 py-4 font-medium">Created</th>
                  <th className="px-5 py-4 font-medium">Approval</th>
                  <th className="px-5 py-4 font-medium">Availability</th>
                  <th className="px-5 py-4 text-right font-medium">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {services.map((service) => (
                  <tr key={service._id} className="hover:bg-muted/30">
                    {/* Service */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-14 shrink-0 overflow-hidden rounded-md bg-muted">
                          {service.images?.[0] && (
                            <Image
                              src={service.images[0]}
                              alt={service.serviceName}
                              fill
                              unoptimized
                              className="object-cover"
                            />
                          )}
                        </div>

                        <div className="max-w-[220px]">
                          <p className="truncate font-medium">
                            {service.serviceName}
                          </p>
                          <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span className="truncate">{service.location}</span>
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-5 py-4">{service.category}</td>

                    {/* Price */}
                    <td className="px-5 py-4 font-medium">
                      ৳{Number(service.price).toLocaleString("en-BD")}
                    </td>

                    {/* Date */}
                    <td className="px-5 py-4">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <CalendarDays className="h-4 w-4" />
                        {new Date(service.createdAt).toLocaleDateString(
                          "en-BD",
                        )}
                      </span>
                    </td>

                    {/* Approval Status */}
                    <td className="px-5 py-4">
                      <Badge
                        className={`capitalize ${getStatusStyle(service.status)}`}
                      >
                        {service.status}
                      </Badge>
                    </td>

                    {/* Availability */}
                    <td className="px-5 py-4">
                      {service.status === "approved" ? (
                        <form action={toggleAvailabilityAction}>
                          <input
                            type="hidden"
                            name="serviceId"
                            value={service._id}
                          />

                          <input
                            type="hidden"
                            name="isActive"
                            value={String(service.isActive ?? false)}
                          />

                          <button
                            type="submit"
                            className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                              service.isActive
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {service.isActive ? "Available" : "Unavailable"}
                          </button>
                        </form>
                      ) : (
                        <span className="text-xs text-yellow-600">
                          Waiting for approval
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/dashboard/vendor/services/${service._id}`}
                          aria-label="View service"
                          className="inline-flex size-8 items-center justify-center rounded-lg border border-border bg-background transition hover:bg-muted"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>

                        <Link
                          href={`/dashboard/vendor/services/edit/${service._id}`}
                          aria-label="Edit service"
                          className="inline-flex size-8 items-center justify-center rounded-lg border border-border bg-background transition hover:bg-muted"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>

                        <form action={deleteVendorService}>
                          <input
                            type="hidden"
                            name="serviceId"
                            value={service._id}
                          />

                          <Button
                            type="submit"
                            aria-label="Delete service"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-md border text-destructive transition hover:bg-destructive hover:text-white"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyServicesPage;
