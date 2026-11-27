import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-5">
        <div className="rounded-full bg-primary/10 p-4">
          <LoaderCircle className="h-10 w-10 animate-spin text-primary" />
        </div>

        <div className="text-center">
          <p className="font-medium">Loading</p>

          <p className="text-sm text-muted-foreground">Please wait...</p>
        </div>
      </div>
    </div>
  );
}
