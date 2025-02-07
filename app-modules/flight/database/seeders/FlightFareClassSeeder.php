<?php

declare(strict_types=1);

namespace Modules\Flight\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Flight\Enums\FareClass;
use Modules\Flight\Models\Flight;
use Modules\Flight\Models\FlightFareClass;

class FlightFareClassSeeder extends Seeder
{
    public function run(): void
    {
        FlightFareClass::truncate();

        $now = now();
        $batch = [];

        Flight::chunk(100, function ($flights) use (&$batch, $now) {
            foreach ($flights as $flight) {
                // Economy class
                $batch[] = [
                    'flight_id' => $flight->id,
                    'fare_class' => FareClass::ECONOMY->value,
                    'price' => $flight->base_price,
                    'available_seats' => (int) ($flight->available_seats * 0.7), // 70% of total seats
                    'created_at' => $now,
                    'updated_at' => $now,
                ];

                // Business class
                $batch[] = [
                    'flight_id' => $flight->id,
                    'fare_class' => FareClass::BUSINESS->value,
                    'price' => $flight->base_price * 2,
                    'available_seats' => (int) ($flight->available_seats * 0.2), // 20% of total seats
                    'created_at' => $now,
                    'updated_at' => $now,
                ];

                // First class
                $batch[] = [
                    'flight_id' => $flight->id,
                    'fare_class' => FareClass::FIRST->value,
                    'price' => $flight->base_price * 3,
                    'available_seats' => (int) ($flight->available_seats * 0.1), // 10% of total seats
                    'created_at' => $now,
                    'updated_at' => $now,
                ];

                if (count($batch) >= 100) {
                    FlightFareClass::insert($batch);
                    $batch = [];
                }
            }
        });

        if (! empty($batch)) {
            FlightFareClass::insert($batch);
        }
    }
}
