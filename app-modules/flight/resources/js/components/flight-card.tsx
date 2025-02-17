import { Logo } from "@/components/logo";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getDuration } from "@/lib/utils";
import { Flight } from "@flight/index";
import { format } from "date-fns";

export function FlightCard({ flight, onSelectFlight }: { flight: Flight; onSelectFlight: (flight: Flight) => void }) {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="text-sm text-muted-foreground">Direct • {getDuration(flight.departure_time, flight.arrival_time)}</div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div>
              <div className="text-2xl font-bold">{format(new Date(flight.departure_time), "HH:mm")}</div>
              <div className="text-sm text-muted-foreground">
                {flight.origin_airport?.city} ({flight.origin_airport?.iata_code})
              </div>
              <div className="text-xs text-muted-foreground">{format(new Date(flight.departure_time), "dd MMM (EEE)")}</div>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-sm font-medium">Direct</div>
              <div className="text-xs text-muted-foreground">{getDuration(flight.departure_time, flight.arrival_time)}</div>
            </div>

            <div>
              <div className="text-2xl font-bold">{format(new Date(flight.arrival_time), "HH:mm")}</div>
              <div className="text-sm text-muted-foreground">
                {flight.destination_airport?.city} ({flight.destination_airport?.iata_code})
              </div>
              <div className="text-xs text-muted-foreground">{format(new Date(flight.arrival_time), "dd MMM (EEE)")}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Logo className="h-6" />
            <div>
              <div className="text-sm">Artisan Airlines • {flight.flight_number}</div>
              <div className="text-xs text-muted-foreground">{flight.aircraft_type?.name}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
