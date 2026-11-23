import { ClipboardList } from "lucide-react";

export default function ManageServices() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Manage Services</h1>

      <p className="text-muted-foreground mt-2">
        Approve or reject vendor services
      </p>

      <div className="mt-8 rounded-xl border p-10 text-center">
        <ClipboardList className="mx-auto h-12 w-12" />

        <p className="mt-4">Services table coming soon</p>
      </div>
    </div>
  );
}
