import { Button } from "@/components/ui/button";
import Link from "next/link";

const BookService = ({ serviceId, serviceName, price }) => {

  return (
    <Link
      href={`/booking?serviceId=${serviceId}`}
      className="h-12 w-full bg-rose-600 text-base text-white hover:bg-rose-700"
    >
      {/* Booking Button */}
      <Button>Book This Service</Button>
    </Link>
  );
};

export default BookService;
