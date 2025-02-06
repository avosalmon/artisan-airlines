<?php

declare(strict_types=1);

namespace Modules\Flight\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Flight\Models\AircraftType;

class AircraftTypeSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();

        AircraftType::insert([
            [
                'code' => 'B737-800',
                'name' => 'Boeing 737-800',
                'total_seats' => 189,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'code' => 'B787-9',
                'name' => 'Boeing 787-9 Dreamliner',
                'total_seats' => 330,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'code' => 'B777-300ER',
                'name' => 'Boeing 777-300ER',
                'total_seats' => 388,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'code' => 'B777-200',
                'name' => 'Boeing 777-200',
                'total_seats' => 312,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'code' => 'A320neo',
                'name' => 'Airbus A320neo',
                'total_seats' => 180,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'code' => 'A321neo',
                'name' => 'Airbus A321neo',
                'total_seats' => 240,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'code' => 'A330-300',
                'name' => 'Airbus A330-300',
                'total_seats' => 335,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'code' => 'A350-900',
                'name' => 'Airbus A350-900',
                'total_seats' => 325,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'code' => 'A380-800',
                'name' => 'Airbus A380-800',
                'total_seats' => 525,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'code' => 'E190',
                'name' => 'Embraer E190',
                'total_seats' => 100,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);
    }
}
