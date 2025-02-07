import BaseLayout from "@/layouts/base-layout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Flight } from "@flight/index";
import { FlightCard } from "@flight/components/flight-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Index({ flights }: PageProps<{ flights: Flight[] }>) {
  return (
    <BaseLayout>
      <Head title="Search Results" />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            {flights[0]?.origin_airport?.city} to{" "}
            {flights[0]?.destination_airport?.city}
          </h1>

          {/* <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">SORT BY:</span>
              <Select defaultValue="duration">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="duration">TRAVEL DURATION</SelectItem>
                  <SelectItem value="price">PRICE</SelectItem>
                  <SelectItem value="departure">DEPARTURE TIME</SelectItem>
                  <SelectItem value="arrival">ARRIVAL TIME</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div> */}
        </div>

        <div className="space-y-4">
          {flights.map((flight) => (
            <FlightCard key={flight.id} flight={flight} />
          ))}
        </div>
      </div>
    </BaseLayout>
  );
}
