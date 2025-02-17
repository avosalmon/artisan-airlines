import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BaseLayout from "@/layouts/base-layout";
import { cn } from "@/lib/utils";
import { PageProps } from "@/types";
import { FlightHeader } from "@booking/components/flight-header";
import { Booking } from "@booking/index";
import { Flight } from "@flight/index";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";

export default function Create({ booking, flight }: PageProps<{ booking: Booking; flight: Flight }>) {
  const [selectedSeats, setSelectedSeats] = useState<Record<number, string>>({});

  const handleSeatSelection = (passengerId: number, seatNumber: string) => {
    setSelectedSeats((prev) => ({
      ...prev,
      [passengerId]: seatNumber,
    }));
  };

  const handleSubmit = () => {
    if (Object.keys(selectedSeats).length !== booking.passengers?.length) {
      return;
    }

    router.post(route("booking.seat.store", { booking: booking.id }), {
      seat_assignments: selectedSeats,
    });
  };

  return (
    <BaseLayout>
      <Head title="Seat Selection" />
      <FlightHeader flight={flight} booking={booking} />

      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-2xl font-bold">Seat Selection</h2>

          <div className="grid gap-6">
            {booking.passengers?.map((passenger) => (
              <Card key={passenger.id}>
                <CardHeader>
                  <CardTitle>
                    {passenger.first_name} {passenger.last_name}
                  </CardTitle>
                  <CardDescription>Select a seat for this passenger</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-6 gap-2">
                    {available_seats.map((seat) => (
                      <Button
                        key={seat.seat_number}
                        variant={selectedSeats[passenger.id] === seat.seat_number ? "default" : "outline"}
                        className={cn(
                          "h-12 w-12",
                          !seat.is_available && "cursor-not-allowed opacity-50",
                          seat.seat_type === "window" && "bg-blue-50",
                          seat.seat_type === "aisle" && "bg-green-50",
                        )}
                        disabled={
                          !seat.is_available ||
                          (Object.values(selectedSeats).includes(seat.seat_number) && selectedSeats[passenger.id] !== seat.seat_number)
                        }
                        onClick={() => handleSeatSelection(passenger.id, seat.seat_number)}
                      >
                        {seat.seat_number}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <Button onClick={handleSubmit} disabled={Object.keys(selectedSeats).length !== booking.passengers?.length}>
              Continue
            </Button>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
