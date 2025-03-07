<?php

declare(strict_types=1);

namespace ArtisanAir\Flight\Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            AirportSeeder::class,
            AircraftTypeSeeder::class,
            FlightSeeder::class,
            SeatSeeder::class,
        ]);
    }
}
