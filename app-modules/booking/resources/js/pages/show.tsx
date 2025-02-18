import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FormLayout from "@/layouts/form-layout";
import { getDuration } from "@/lib/utils";
import { PageProps } from "@/types";
import { Booking } from "@booking/index";
import { Flight } from "@flight/index";
import { Head, Link } from "@inertiajs/react";
import { CheckCircle, Plane } from "lucide-react";

export default function Show({ booking, flight }: PageProps<{ booking: Booking; flight: Flight }>) {
  return (
    <FormLayout>
      <Head title="Booking Confirmed" />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
          <h1 className="mb-2 text-3xl font-bold">Thank You for Your Booking!</h1>
          <p className="text-xl text-muted-foreground">Your flight has been successfully confirmed.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Booking Reference</p>
                <p className="text-lg font-semibold">{booking.booking_reference}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Flight Number</p>
                <p className="text-lg font-semibold">{flight.flight_number}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 items-center gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">From</p>
                <p className="text-lg font-semibold">
                  {flight.origin_airport?.city} ({flight.origin_airport?.iata_code})
                </p>
                <p className="text-sm text-muted-foreground">{new Date(flight.departure_time).toLocaleString()}</p>
              </div>
              <Plane className="h-8 w-8 justify-self-center" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">To</p>
                <p className="text-lg font-semibold">
                  {flight.destination_airport?.city} ({flight.destination_airport?.iata_code})
                </p>
                <p className="text-sm text-muted-foreground">{new Date(flight.arrival_time).toLocaleString()}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Duration</p>
                <p className="text-lg font-semibold">{getDuration(flight.departure_time, flight.arrival_time)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Passengers</p>
                <p className="text-lg font-semibold">{booking.passengers?.length}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Price</p>
                <p className="text-lg font-semibold">${booking.total_amount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </FormLayout>
  );
}
