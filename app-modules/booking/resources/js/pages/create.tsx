import BaseLayout from "@/layouts/base-layout";
import { PageProps } from "@/types";
import { Booking } from "@booking/index";
import { Flight } from "@flight/index";
import { Head } from "@inertiajs/react";
import { FlightHeader } from "../components/flight-header";

export default function Create({ booking, flight }: PageProps<{ booking: Booking; flight: Flight }>) {
  return (
    <BaseLayout>
      <Head title="Passenger Details" />
      <FlightHeader flight={flight} booking={booking} />

      <div className="container mx-auto px-4 py-8">{/* Passenger form will go here */}</div>
    </BaseLayout>
  );
}
