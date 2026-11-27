import Link from "next/link";
import { notFound } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { requireRole } from "@/app/lib/session";
import { getServiceById } from "@/lib/api/services";
import EditServiceForm from "./EditServiceForm";

export default async function EditServicePage({ params }) {
  const { id } = await params;

  const session = await requireRole(
    ["vendor"],
    "/dashboard/vendor/my-services",
  );

  let service = null;

  try {
    service = await getServiceById(id);
  } catch (error) {
    console.error("Edit service error:", error);
  }

  if (!service || !service._id) {
    notFound();
  }

  if (String(service.vendorId) !== String(session.user.id)) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardContent className="space-y-4 p-8 text-center">
            <h2 className="text-xl font-bold">Access Denied</h2>
            <p className="text-sm text-muted-foreground">
              You can only edit services that belong to your vendor account.
            </p>
            <Link
              href="/dashboard/vendor/my-services"
              className="inline-flex rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground"
            >
              Back to My Services
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <EditServiceForm service={service} />;
}
