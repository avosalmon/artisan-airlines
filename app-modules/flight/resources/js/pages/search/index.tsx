import BaseLayout from "@/layouts/base-layout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Flight } from "@flight/index";

export default function Index({ flights }: PageProps<{
  flights: Flight[];
}>) {
  return (
    <BaseLayout>
      <Head title="Search Results" />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Search Results</h1>
        <div className="mt-4">
          {flights.map((flight) => (
            <div key={flight.id}>{flight.flight_number}</div>
          ))}
        </div>
      </div>
    </BaseLayout>
  );
}
