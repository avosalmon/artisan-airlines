import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getDuration } from "@/lib/utils";
import { Flight, FlightFareClass } from "@flight/index";
import { format } from "date-fns";

export function FlightCard({ flight, onSelectFareClass }: { flight: Flight; onSelectFareClass: (fareClass: FlightFareClass) => void }) {
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
      <Separator />
      <CardFooter className="flex justify-between p-0">
        {flight.fare_classes?.map((fareClass) => (
          <div className="flex-1 p-4 text-center" key={fareClass.id}>
            <div className="font-medium uppercase">{fareClass.fare_class}</div>
            <div className="text-xl font-bold">USD {fareClass.price.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">PER ADULT</div>
            <Button className="mt-2 w-full" onClick={() => onSelectFareClass(fareClass)}>
              Select
            </Button>
          </div>
        ))}
      </CardFooter>
    </Card>
  );
}
