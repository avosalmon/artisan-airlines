import { Logo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getDuration } from "@/lib/utils";
import { Flight } from "@flight/index";
import { format } from "date-fns";
import { Plane, UtensilsCrossed, Wifi } from "lucide-react";

export function FlightCard({ flight, passengers, onSelectFlight }: { flight: Flight; passengers: number; onSelectFlight: (flight: Flight) => void }) {
  return (
    <Card className="mb-4">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-left">
              <div className="text-sm font-semibold text-muted-foreground">
                {flight.origin_airport?.city} ({flight.origin_airport?.iata_code})
              </div>
              <div className="text-3xl font-bold">{format(new Date(flight.departure_time), "HH:mm")}</div>
              <div className="text-sm text-muted-foreground">{format(new Date(flight.departure_time), "dd MMM (EEE)")}</div>
            </div>

            <div className="flex flex-col items-center px-8">
              <div className="text-sm text-muted-foreground">{getDuration(flight.departure_time, flight.arrival_time)}</div>
              <div className="relative my-2 h-[2px] w-[200px] bg-border">
                <div className="absolute -top-1 left-0 h-2 w-2 rounded-full bg-primary" />
                <div className="absolute -top-1 right-0 h-2 w-2 rounded-full bg-primary" />
              </div>
              <div className="text-sm text-muted-foreground">0 stops</div>
            </div>

            <div className="text-right">
              <div className="text-sm font-semibold text-muted-foreground">
                {flight.destination_airport?.city} ({flight.destination_airport?.iata_code})
              </div>
              <div className="text-3xl font-bold">{format(new Date(flight.arrival_time), "HH:mm")}</div>
              <div className="text-sm text-muted-foreground">{format(new Date(flight.arrival_time), "dd MMM (EEE)")}</div>
            </div>
          </div>

          <div>
            <div className="text-3xl font-bold">${(flight.price * passengers).toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">
              ${flight.price.toLocaleString()} x {passengers} adult
            </div>
          </div>
        </div>

        {/* Flight info and amenities row */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-2 rounded-sm">
              <Logo className="size-4" />
              <span>{flight.flight_number}</span>
            </Badge>
            <Badge variant="outline" className="gap-2 rounded-sm">
              <Wifi className="h-4 w-4" />
              <span>WIFI Access</span>
            </Badge>
            <Badge variant="outline" className="gap-2 rounded-sm">
              <UtensilsCrossed className="h-4 w-4" />
              <span>Meals</span>
            </Badge>
            <Badge variant="outline" className="gap-2 rounded-sm">
              <Plane className="h-4 w-4" />
              <span>{flight.aircraft_type?.name}</span>
            </Badge>
          </div>

          <Button onClick={() => onSelectFlight(flight)} className="px-8">
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
