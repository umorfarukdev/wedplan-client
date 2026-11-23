import Link from "next/link";
import { Heart } from "lucide-react";

/**
 * Site logo used in the checkout header. Matches the branding in the Navbar.
 */
export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="flex size-8 items-center justify-center rounded-lg bg-rose-500">
        <Heart className="size-4 fill-white text-white" />
      </div>

      <span className="text-lg font-bold">
        Wed<span className="text-rose-500">Plan</span>
      </span>
    </Link>
  );
}

export default Logo;
