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
                    'created_at' => $now,
                    'updated_at' => $now,
                ];

                // Business class
                $batch[] = [
                    'flight_id' => $flight->id,
                    'fare_class' => FareClass::BUSINESS->value,
                    'price' => $flight->base_price * 2,
                    'created_at' => $now,
                    'updated_at' => $now,
                ];

                // First class
                $batch[] = [
                    'flight_id' => $flight->id,
                    'fare_class' => FareClass::FIRST->value,
                    'price' => $flight->base_price * 3,
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
