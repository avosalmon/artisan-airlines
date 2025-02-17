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
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'code' => 'B787-9',
                'name' => 'Boeing 787-9 Dreamliner',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'code' => 'B777-300ER',
                'name' => 'Boeing 777-300ER',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'code' => 'B777-200',
                'name' => 'Boeing 777-200',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'code' => 'A320neo',
                'name' => 'Airbus A320neo',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'code' => 'A321neo',
                'name' => 'Airbus A321neo',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'code' => 'A330-300',
                'name' => 'Airbus A330-300',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'code' => 'A350-900',
                'name' => 'Airbus A350-900',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'code' => 'A380-800',
                'name' => 'Airbus A380-800',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'code' => 'E190',
                'name' => 'Embraer E190',
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);
    }
}
