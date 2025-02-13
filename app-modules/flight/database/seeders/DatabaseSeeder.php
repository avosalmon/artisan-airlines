<?php

declare(strict_types=1);

namespace Modules\Flight\Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            AirportSeeder::class,
            AircraftTypeSeeder::class,
            FlightSeeder::class,
            FlightFareClassSeeder::class,
            SeatSeeder::class,
        ]);
    }
}
