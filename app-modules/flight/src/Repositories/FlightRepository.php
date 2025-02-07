<?php

declare(strict_types=1);

namespace Modules\Flight\Repositories;

use Modules\Flight\Contracts\FlightRepository as FlightRepositoryContract;
use Modules\Flight\DataTransferObjects\Airport;
use Modules\Flight\DataTransferObjects\Flight;
use Modules\Flight\Models\FlightFareClass;

class FlightRepository implements FlightRepositoryContract
{
    public function findByFareClassId(int $flightFareClassId): ?Flight
    {
        $flightFareClass = FlightFareClass::with([
            'flight.originAirport',
            'flight.destinationAirport',
        ])->find($flightFareClassId);

        if (! $flightFareClass) {
            return null;
        }

        $flight = $flightFareClass->flight;

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
            departure_time: $flight->departure_time,
            arrival_time: $flight->arrival_time,
            fare_class: $flightFareClass->fare_class,
            price: $flightFareClass->price,
            available_seats: $flightFareClass->available_seats,
        );
    }
}
