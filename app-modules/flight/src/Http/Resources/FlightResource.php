<?php

declare(strict_types=1);

namespace Modules\Flight\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FlightResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'flight_number' => $this->flight_number,
            'departure_time' => $this->departure_time,
            'arrival_time' => $this->arrival_time,
            'status' => $this->status,
            'available_seats' => $this->available_seats,
            'base_price' => $this->base_price,
            'origin_airport' => $this->originAirport,
            'destination_airport' => $this->destinationAirport,
            'aircraft_type' => $this->aircraftType,
            'prices' => $this->prices,
        ];
    }
}
