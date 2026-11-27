import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center space-y-6">
        <h1 className="text-8xl font-bold text-primary">404</h1>

        <h2 className="text-3xl font-semibold">Page Not Found</h2>

        <p className="text-muted-foreground max-w-md mx-auto">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>

        <Link href={"/"}>
          <Button>Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
