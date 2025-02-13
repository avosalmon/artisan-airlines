<?php

declare(strict_types=1);

namespace Modules\Flight\Database\Seeders;

use Carbon\CarbonImmutable;
use Illuminate\Database\Seeder;
use Modules\Flight\Enums\FlightStatus;
use Modules\Flight\Models\AircraftType;
use Modules\Flight\Models\Airport;
use Modules\Flight\Models\Flight;

class FlightSeeder extends Seeder
{
    /**
     * Average cruising speed in kilometers per hour
     */
    private const AVERAGE_SPEED = 800;

    /**
     * Additional time in minutes for takeoff, landing, and taxiing
     */
    private const GROUND_TIME = 60;

    public function run(): void
    {
        Flight::truncate();

        $airports = Airport::all();
        $aircraftTypes = AircraftType::all();
        $now = CarbonImmutable::now();
        $batch = [];

        $departures = ['10:30', '18:30'];

        // Create flights for the next 30 days
        for ($i = 0; $i < 30; $i++) {
            $date = $now->addDays($i);

            foreach ($airports as $origin) {
                foreach ($airports as $destination) {
                    if ($origin->is($destination)) {
                        continue;
                    }

                    $aircraftType = $aircraftTypes->random();
                    $basePrice = $this->calculateBasePrice($origin, $destination);
                    $flightDuration = $this->calculateFlightDuration($origin, $destination);

                    foreach ($departures as $departure) {
                        [$hours, $minutes] = explode(':', $departure);
                        $departure = $date->setHour((int) $hours)->setMinute((int) $minutes)->setSecond(0);
                        $arrival = $departure->addMinutes($flightDuration);

                        $batch[] = [
                            'flight_number' => 'NH'.rand(100, 999),
                            'origin_airport_id' => $origin->id,
                            'destination_airport_id' => $destination->id,
                            'aircraft_type_id' => $aircraftType->id,
                            'departure_time' => $departure->toDateTime(),
                            'arrival_time' => $arrival->toDateTime(),
                            'base_price' => $basePrice,
                            'status' => FlightStatus::SCHEDULED->value,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }

                    if (count($batch) >= 100) {
                        Flight::insert($batch);
                        $batch = [];
                    }
                }
            }
        }

        if (! empty($batch)) {
            Flight::insert($batch);
        }
    }

    private function calculateFlightDuration(Airport $origin, Airport $destination): int
    {
        // Calculate distance using the Haversine formula
        $lat1 = deg2rad($origin->latitude);
        $lon1 = deg2rad($origin->longitude);
        $lat2 = deg2rad($destination->latitude);
        $lon2 = deg2rad($destination->longitude);

        $deltaLat = $lat2 - $lat1;
        $deltaLon = $lon2 - $lon1;

        $a = sin($deltaLat / 2) * sin($deltaLat / 2) +
            cos($lat1) * cos($lat2) *
            sin($deltaLon / 2) * sin($deltaLon / 2);

        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));

        // Earth's radius in kilometers
        $r = 6371;

        // Calculate distance in kilometers
        $distance = $r * $c;

        // Calculate flight time in minutes
        // Convert speed from km/h to km/minute
        $speedInKmPerMinute = self::AVERAGE_SPEED / 60;

        // Calculate pure flight time and add ground operations time
        return (int) ceil($distance / $speedInKmPerMinute) + self::GROUND_TIME;
    }

    private function calculateBasePrice(Airport $origin, Airport $destination): int
    {
        // Base prices in USD for different route types
        if ($origin->country === $destination->country) {
            // Domestic flights: $100-300
            return rand(100, 300);
        }

        if ($origin->continent === $destination->continent) {
            // Regional flights (same continent): $200-600
            return rand(200, 600);
        }

        // Check if either origin or destination is in these regions
        $isLongHaulRegion = function (Airport $airport): bool {
            return in_array($airport->country, [
                'United States',
                'Canada',
                'Brazil',
                'Argentina',
                'United Kingdom',
                'France',
                'Germany',
                'Australia',
                'New Zealand',
            ]);
        };

        if ($isLongHaulRegion($origin) || $isLongHaulRegion($destination)) {
            // Long-haul international flights: $800-2000
            return rand(800, 2000);
        }

        // Medium-haul international flights: $400-1000
        return rand(400, 1000);
    }
}
