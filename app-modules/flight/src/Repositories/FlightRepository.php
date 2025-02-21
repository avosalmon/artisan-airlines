<?php

declare(strict_types=1);

namespace ArtisanAir\Flight\Repositories;

use ArtisanAir\Flight\Contracts\FlightRepository as FlightRepositoryContract;
use ArtisanAir\Flight\DataTransferObjects\Airport;
use ArtisanAir\Flight\DataTransferObjects\Flight;
use ArtisanAir\Flight\DataTransferObjects\Seat;
use ArtisanAir\Flight\Models\Flight as FlightModel;
use ArtisanAir\Flight\Models\Seat as SeatModel;

class FlightRepository implements FlightRepositoryContract
{
    public function find(int $flightId): ?Flight
    {
        $flight = FlightModel::with([
            'originAirport',
            'destinationAirport',
            'seats',
        ])->find($flightId);

        if (! $flight) {
            return null;
        }

        return new Flight(
            id: $flight->id,
            flight_number: $flight->flight_number,
            origin_airport: new Airport(
                id: $flight->originAirport->id,
                iata_code: $flight->originAirport->iata_code,
                name: $flight->originAirport->name,
                city: $flight->originAirport->city,
                country: $flight->originAirport->country,
                timezone: $flight->originAirport->timezone,
            ),
            destination_airport: new Airport(
                id: $flight->destinationAirport->id,
                iata_code: $flight->destinationAirport->iata_code,
                name: $flight->destinationAirport->name,
                city: $flight->destinationAirport->city,
                country: $flight->destinationAirport->country,
                timezone: $flight->destinationAirport->timezone,
            ),
            departure_time: $flight->departure_time->format('Y-m-d H:i:s'),
            arrival_time: $flight->arrival_time->format('Y-m-d H:i:s'),
            price: $flight->price,
            seats: $flight->seats->map(fn (SeatModel $seat) => new Seat(
                id: $seat->id,
                seat_number: $seat->seat_number,
                is_available: $seat->is_available,
            ))->toArray(),
        );
    }
}
