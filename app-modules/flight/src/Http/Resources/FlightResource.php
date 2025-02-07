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
            'origin_airport' => new AirportResource($this->whenLoaded('originAirport')),
            'destination_airport' => new AirportResource($this->whenLoaded('destinationAirport')),
            'aircraft_type' => new AircraftTypeResource($this->whenLoaded('aircraftType')),
            'fare_classes' => FlightFareClassResource::collection($this->whenLoaded('fareClasses')),
        ];
    }
}
