import BaseLayout from "@/layouts/base-layout";
import { PageProps } from "@/types";
import { FlightCard } from "@flight/components/flight-card";
import { Flight, FlightFareClass } from "@flight/index";
import { Head, router } from "@inertiajs/react";

export default function Index({ flights, passengers }: PageProps<{ flights: Flight[]; passengers: number }>) {
  const createPendingBooking = (fareClass: FlightFareClass) => {
    router.post(route("booking.pending.store"), {
      fare_class_id: fareClass.id,
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
            <FlightCard key={flight.id} flight={flight} onSelectFareClass={createPendingBooking} />
          ))}
        </div>
      </div>
    </BaseLayout>
  );
}
