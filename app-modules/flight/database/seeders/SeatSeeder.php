<?php

declare(strict_types=1);

namespace Modules\Flight\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Flight\Enums\FareClass;
use Modules\Flight\Models\FlightFareClass;
use Modules\Flight\Models\Seat;

class SeatSeeder extends Seeder
{
    private array $seats = [];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        FlightFareClass::query()
            ->chunkById(100, function ($fareClasses) {
                foreach ($fareClasses as $fareClass) {
                    match ($fareClass->fare_class) {
                        FareClass::FIRST => $this->createFirstClassSeats($fareClass),
                        FareClass::BUSINESS => $this->createBusinessClassSeats($fareClass),
                        FareClass::ECONOMY => $this->createEconomyClassSeats($fareClass),
                        default => null,
                    };

                    if (count($this->seats) >= 100) {
                        Seat::insert($this->seats);
                        $this->seats = [];
                    }
                }
            });

        if (! empty($this->seats)) {
            Seat::insert($this->seats);
        }
    }

    private function createFirstClassSeats(FlightFareClass $fareClass): void
    {
        $columns = ['A', 'C', 'D', 'F'];
        $rows = [1, 2];

        foreach ($rows as $row) {
            foreach ($columns as $column) {
                $this->seats[] = [
                    'flight_fare_class_id' => $fareClass->id,
                    'seat_number' => $row.$column,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }
    }

    private function createBusinessClassSeats(FlightFareClass $fareClass): void
    {
        $columns = ['A', 'C', 'D', 'F'];
        $rows = range(3, 7); // 5 rows * 4 seats = 20 seats

        foreach ($rows as $row) {
            foreach ($columns as $column) {
                $this->seats[] = [
                    'flight_fare_class_id' => $fareClass->id,
                    'seat_number' => $row.$column,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }
    }

    private function createEconomyClassSeats(FlightFareClass $fareClass): void
    {
        $columns = ['A', 'B', 'C', 'D', 'E', 'F'];
        $rows = range(8, 22); // 15 rows * 6 seats = 90 seats

        foreach ($rows as $row) {
            foreach ($columns as $column) {
                $this->seats[] = [
                    'flight_fare_class_id' => $fareClass->id,
                    'seat_number' => $row.$column,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }
    }
}
