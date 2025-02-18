import FormLayout from "@/layouts/form-layout";
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
    <FormLayout>
      <Head title="Search Results" />

      <div className="container px-4 py-8 max-w-screen-md mx-auto -mt-4">
        
        {/* Title */}
        <div className="mb-8 flex items-center justify-between motion-preset-blur-up">
          <h1 className="text-6xl font-bold">
            {flights[0]?.origin_airport?.city} <span>→</span> {flights[0]?.destination_airport?.city}
          </h1>
        </div>

        {/* Flights */}
        <div className="space-y-8">
          {flights.map((flight, index) => (
            <FlightCard key={flight.id} flight={flight} passengers={passengers} onSelectFlight={createPendingBooking} className={`motion-preset-blur-up delay-[${index * 150}ms]`} />
          ))}
        </div>
      </div>
    </FormLayout>
  );
}
