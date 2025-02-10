import BaseLayout from "@/layouts/base-layout";
import { PageProps } from "@/types";
import { FlightHeader } from "@booking/components/flight-header";
import { Booking } from "@booking/index";
import { Flight } from "@flight/index";
import { Head } from "@inertiajs/react";

export default function Create({ booking, flight }: PageProps<{ booking: Booking; flight: Flight }>) {
  return (
    <BaseLayout>
      <Head title="Seat Selection" />
      <FlightHeader flight={flight} booking={booking} />

      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-6 text-2xl font-bold">Seat Selection</h2>
        </div>
      </div>
    </BaseLayout>
  );
}
