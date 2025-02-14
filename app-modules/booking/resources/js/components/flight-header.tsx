import { getDuration } from "@/lib/utils";
import { Booking } from "@booking/index";
import { Flight } from "@flight/index";
import { format } from "date-fns";

export function FlightHeader({ flight, booking }: { flight: Flight; booking: Booking }) {
  return (
    <div className="p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm">
            <span>{flight.origin_airport?.iata_code}</span>
            <span>-</span>
            <span>{flight.destination_airport?.iata_code}</span>
            <span>•</span>
            <span>
              {booking.passenger_count} Adult{booking.passenger_count > 1 && "s"}
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-16">
              <div>
                <div className="text-3xl font-bold">
                  {flight.origin_airport?.iata_code} {format(new Date(flight.departure_time), "HH:mm")}
                </div>
                <div className="text-sm">{flight.origin_airport?.city}</div>
              </div>

              <div className="flex flex-col items-center">
                <div className="text-sm">{getDuration(flight.departure_time, flight.arrival_time)}</div>
                <div className="relative w-32">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-400"></div>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-3xl font-bold">
                  {flight.destination_airport?.iata_code} {format(new Date(flight.arrival_time), "HH:mm")}
                </div>
                <div className="text-sm">{flight.destination_airport?.city}</div>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-sm">Total fare</div>
            <div className="text-2xl font-bold">USD {booking.total_amount.toLocaleString()}</div>
            <div className="text-xs">Total fare includes discounts, taxes and surcharges</div>
          </div>
        </div>
      </div>
    </div>
  );
}
