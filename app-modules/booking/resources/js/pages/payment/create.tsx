import BaseLayout from "@/layouts/base-layout";
import { PageProps } from "@/types";
import { FlightHeader } from "@booking/components/flight-header";
import { Booking } from "@booking/index";
import { Flight } from "@flight/index";
import { Head } from "@inertiajs/react";

export default function Create({ booking, flight }: PageProps<{ booking: Booking; flight: Flight }>) {
  return (
    <BaseLayout>
      <Head title="Payment" />
      <FlightHeader flight={flight} booking={booking} />
    </BaseLayout>
  );
}
