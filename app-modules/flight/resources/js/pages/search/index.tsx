import BaseLayout from "@/layouts/base-layout";
import { PageProps } from "@/types";
import { FlightCard } from "@flight/components/flight-card";
import { Flight } from "@flight/index";
import { Head, router } from "@inertiajs/react";

export default function Index({ flights, passengers }: PageProps<{ flights: Flight[]; passengers: number }>) {
  const createPendingBooking = (flight: Flight) => {
    router.post(route("booking.pending.store"), {
      flight_id: flight.id,
      passengers,
    });
  };

  return (
    <BaseLayout>
      <Head title="Search Results" />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            {flights[0]?.origin_airport?.city} to {flights[0]?.destination_airport?.city}
          </h1>
        </div>

        <div className="space-y-4">
          {flights.map((flight) => (
            <FlightCard key={flight.id} flight={flight} onSelectFlight={createPendingBooking} />
          ))}
        </div>
      </div>
    </BaseLayout>
  );
}
