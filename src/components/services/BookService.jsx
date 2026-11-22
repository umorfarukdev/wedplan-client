
"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "@/app/lib/auth-client";
import { toast } from "react-toastify";

import { applyBooking } from "@/lib/actions/booking";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { Loader2, CalendarDays, MapPin } from "lucide-react";

const BookingPage = () => {
  const { serviceId } = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session) {
      router.push("/sign-in");
      return;
    }

    if (session.user.role !== "customer") {
      toast.error("Only customers can book services.");
      return;
    }

    if (!eventDate || !eventLocation.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      const bookingData = {
        serviceId,
        eventDate,
        eventLocation: eventLocation.trim(),
        message: message?.trim(),
      };

      await applyBooking(bookingData);

      toast.success("Booking request submitted successfully!");

      router.push("/dashboard/customer/bookings");
    } catch (error) {
      toast.error(error.message || "Booking failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-muted/30 px-4 py-12">
      <div className="mx-auto max-w-2xl rounded-2xl border bg-card p-6 shadow-sm sm:p-8">

        <div className="mb-8">
          <h1 className="text-2xl font-bold">
            Book Wedding Service
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Provide your event information to send a booking request.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="space-y-2">
            <Label htmlFor="eventDate">
              Event Date *
            </Label>

            <div className="relative">
              <CalendarDays className="absolute left-3 top-3 size-4 text-muted-foreground" />

              <Input
                id="eventDate"
                type="date"
                value={eventDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setEventDate(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="eventLocation">
              Event Location *
            </Label>

            <div className="relative">
              <MapPin className="absolute left-3 top-3 size-4 text-muted-foreground" />

              <Input
                id="eventLocation"
                placeholder="e.g. Dhaka, Bangladesh"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">
              Additional Message
            </Label>

            <Textarea
              id="message"
              placeholder="Tell the vendor about your wedding requirements..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="h-12 w-full bg-rose-600 hover:bg-rose-700"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Booking Request"
            )}
          </Button>

        </form>
      </div>
    </main>
  );
};

export default BookingPage;
