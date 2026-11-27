import Link from "next/link";

export default function ServiceNotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold">Service Not Found</h1>

      <p className="text-muted-foreground mt-3">
        This wedding service is unavailable.
      </p>

      <Link href={"/"}>Back to home</Link>
    </div>
  );
}
