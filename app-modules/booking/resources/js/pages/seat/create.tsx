import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import FormLayout from "@/layouts/form-layout";
import { PageProps } from "@/types";
import { SeatButton } from "@booking/components/seat-button";
import { Booking } from "@booking/index";
import { FlightCard } from "@flight/components/flight-card";
import { Flight } from "@flight/index";
import { Head, useForm } from "@inertiajs/react";

interface SeatAssignment {
  passenger_id: number;
  seat_id: number | null;
}

export default function Create({ booking, flight }: PageProps<{ booking: Booking; flight: Flight }>) {
  const { data, setData, post, processing } = useForm<{ seat_assignments: SeatAssignment[] }>({
    seat_assignments:
      booking.passengers?.map((passenger) => ({
        passenger_id: passenger.id,
        seat_id: null,
      })) || [],
  });

  const selectSeat = (passengerId: number, seatId: number) => {
    setData({
      seat_assignments: data.seat_assignments.map((assignment) =>
        assignment.passenger_id === passengerId ? { passenger_id: passengerId, seat_id: seatId } : assignment,
      ),
    });
  };

  const submit = () => {
    post(route("booking.seat.store", { booking: booking.id }));
  };

  return (
    <FormLayout>
      <Head title="Seat Selection" />

      <div className="container mx-auto px-4 py-8">
        <FlightCard flight={flight} passengers={booking.passenger_count} />

        <div className="mx-auto py-8">
          <h2 className="mb-6 text-2xl font-bold">Seat Selection</h2>

          <div className="motion-preset-blur-up grid gap-6" style={{ animationDelay: "300ms" }}>
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
                            selected={data.seat_assignments.some((assignment) => assignment.seat_id === seat.id)}
                            onClick={() => selectSeat(passenger.id, seat.id)}
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
                            selected={data.seat_assignments.some((assignment) => assignment.seat_id === seat.id)}
                            onClick={() => selectSeat(passenger.id, seat.id)}
                          />
                        ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <Button onClick={submit} disabled={processing || !data.seat_assignments.every((assignment) => assignment.seat_id)}>
              Continue
            </Button>
          </div>
        </div>
      </div>
    </FormLayout>
  );
}
