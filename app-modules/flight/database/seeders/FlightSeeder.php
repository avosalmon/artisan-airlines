<?php

declare(strict_types=1);

namespace Modules\Flight\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Flight\Enums\FlightStatus;
use Modules\Flight\Models\AircraftType;
use Modules\Flight\Models\Airport;
use Modules\Flight\Models\Flight;

class FlightSeeder extends Seeder
{
    public function run(): void
    {
        Flight::truncate();

        $airports = Airport::all();
        $aircraftTypes = AircraftType::all();
        $now = now();
        $batch = [];

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

                    // Morning flight
                    $batch[] = [
                        'flight_number' => 'NH'.rand(100, 999),
                        'origin_airport_id' => $origin->id,
                        'destination_airport_id' => $destination->id,
                        'aircraft_type_id' => $aircraftType->id,
                        'departure_time' => $date->setHour(8)->setMinute(0)->setSecond(0)->toDateTime(),
                        'arrival_time' => $date->setHour(12)->setMinute(0)->setSecond(0)->toDateTime(),
                        'base_price' => $basePrice,
                        'status' => FlightStatus::SCHEDULED->value,
                        'available_seats' => $aircraftType->total_seats,
                        'created_at' => $now,
                        'updated_at' => $now,
                    ];

                    // Evening flight
                    $batch[] = [
                        'flight_number' => 'NH'.rand(100, 999),
                        'origin_airport_id' => $origin->id,
                        'destination_airport_id' => $destination->id,
                        'aircraft_type_id' => $aircraftType->id,
                        'departure_time' => $date->setHour(16)->setMinute(0)->setSecond(0)->toDateTime(),
                        'arrival_time' => $date->setHour(20)->setMinute(0)->setSecond(0)->toDateTime(),
                        'base_price' => $basePrice,
                        'status' => FlightStatus::SCHEDULED->value,
                        'available_seats' => $aircraftType->total_seats,
                        'created_at' => $now,
                        'updated_at' => $now,
                    ];

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
