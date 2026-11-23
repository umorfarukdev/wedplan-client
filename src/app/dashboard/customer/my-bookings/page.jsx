
import { auth } from "@/app/lib/auth";
import MyBookingsClient from "@/components/bookings/MyBookingsClient";
import { getMyBookings } from "@/lib/actions/booking";
import { headers } from "next/headers";

const MyBookingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()

  });

  const email = session?.user?.email;

  if (!email) {
    return (
      <div className="p-10 text-center">
        Please login first
      </div>
    );
  }

  const bookings = await getMyBookings(email);

  return (
    <MyBookingsClient bookings={bookings} />
  );
};

export default MyBookingsPage;