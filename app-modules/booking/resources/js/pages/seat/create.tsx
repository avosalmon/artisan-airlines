import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BaseLayout from "@/layouts/base-layout";
import { PageProps } from "@/types";
import { FlightHeader } from "@booking/components/flight-header";
import { SeatButton } from "@booking/components/seat-button";
import { Booking } from "@booking/index";
import { Flight } from "@flight/index";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";

export default function Create({ booking, flight }: PageProps<{ booking: Booking; flight: Flight }>) {
  const [selectedSeats, setSelectedSeats] = useState<Record<number, string>>({});

  const selectSeat = (passengerId: number, seatNumber: string) => {
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
                  <div className="flex justify-center gap-16">
                    {/* Left block (ABC) */}
                    <div className="grid grid-cols-3 gap-2">
                      {flight.seats
                        .filter((seat) => ["A", "B", "C"].includes(seat.seat_number.slice(-1)))
                        .map((seat) => (
                          <SeatButton
                            key={seat.id}
                            seat={seat}
                            selected={selectedSeats[passenger.id] === seat.seat_number}
                            disabled={
                              !seat.is_available ||
                              (Object.values(selectedSeats).includes(seat.seat_number) && selectedSeats[passenger.id] !== seat.seat_number)
                            }
                            onClick={() => selectSeat(passenger.id, seat.seat_number)}
                          />
                        ))}
                    </div>

                    {/* Right block (DEF) */}
                    <div className="grid grid-cols-3 gap-2">
                      {flight.seats
                        .filter((seat) => ["D", "E", "F"].includes(seat.seat_number.slice(-1)))
                        .map((seat) => (
                          <SeatButton
                            key={seat.id}
                            seat={seat}
                            selected={selectedSeats[passenger.id] === seat.seat_number}
                            disabled={
                              !seat.is_available ||
                              (Object.values(selectedSeats).includes(seat.seat_number) && selectedSeats[passenger.id] !== seat.seat_number)
                            }
                            onClick={() => selectSeat(passenger.id, seat.seat_number)}
                          />
                        ))}
                    </div>
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
