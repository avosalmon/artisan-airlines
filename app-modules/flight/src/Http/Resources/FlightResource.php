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
            'departure_time' => $this->departure_time->format('Y-m-d H:i:s'),
            'arrival_time' => $this->arrival_time->format('Y-m-d H:i:s'),
            'status' => $this->status,
            'price' => $this->price,
            'origin_airport' => new AirportResource($this->whenLoaded('originAirport')),
            'destination_airport' => new AirportResource($this->whenLoaded('destinationAirport')),
            'aircraft_type' => new AircraftTypeResource($this->whenLoaded('aircraftType')),
        ];
    }
}
