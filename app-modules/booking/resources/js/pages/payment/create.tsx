import FormLayout from "@/layouts/form-layout";
import { PageProps } from "@/types";
import { Booking } from "@booking/index";
import { FlightCard } from "@flight/components/flight-card";
import { Flight } from "@flight/index";
import { Head } from "@inertiajs/react";

export default function Create({ booking, flight }: PageProps<{ booking: Booking; flight: Flight }>) {
  return (
    <FormLayout>
      <Head title="Payment" />
      <FlightCard flight={flight} passengers={booking.passenger_count} />
    </FormLayout>
  );
}
