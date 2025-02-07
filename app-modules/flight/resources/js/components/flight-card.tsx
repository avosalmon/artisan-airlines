import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Flight } from "@flight/index";
import { format, intervalToDuration } from "date-fns";

export function FlightCard({ flight }: { flight: Flight }) {
  const getDuration = (departure: string, arrival: string) => {
    const diff = intervalToDuration({
      start: new Date(departure),
      end: new Date(arrival),
    });
    return `${diff.hours}hrs ${diff.minutes ? `${diff.minutes}mins` : ""}`;
  };

  const economyFare = flight.fare_classes?.find((fc) => fc.fare_class === "economy");
  const businessFare = flight.fare_classes?.find((fc) => fc.fare_class === "business");

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
              <div className="text-sm text-muted-foreground">{flight.origin_airport?.city}</div>
              <div className="text-xs text-muted-foreground">{format(new Date(flight.departure_time), "dd MMM (EEE)")}</div>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-sm font-medium">Direct</div>
              <div className="text-xs text-muted-foreground">{getDuration(flight.departure_time, flight.arrival_time)}</div>
            </div>

            <div>
              <div className="text-2xl font-bold">{format(new Date(flight.arrival_time), "HH:mm")}</div>
              <div className="text-sm text-muted-foreground">{flight.destination_airport?.city}</div>
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
        <div className="flex-1 p-4 text-center">
          <div className="font-medium">ECONOMY</div>
          {economyFare ? (
            <>
              <div className="text-sm text-muted-foreground">FROM USD</div>
              <div className="text-xl font-bold">${economyFare.price.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">PER ADULT</div>
              <Button className="mt-2 w-full" variant="default">
                Select
              </Button>
            </>
          ) : (
            <div className="text-sm text-muted-foreground">Not available</div>
          )}
        </div>
        <Separator orientation="vertical" />
        <div className="flex-1 p-4 text-center">
          <div className="font-medium">PREMIUM ECONOMY</div>
          {businessFare ? (
            <>
              <div className="text-sm text-muted-foreground">FROM USD</div>
              <div className="text-xl font-bold">${businessFare.price.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">PER ADULT</div>
              <Button className="mt-2 w-full" variant="default">
                Select
              </Button>
            </>
          ) : (
            <div className="text-sm text-muted-foreground">Not available</div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
