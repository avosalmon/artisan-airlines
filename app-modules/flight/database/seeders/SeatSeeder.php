<?php

declare(strict_types=1);

namespace Modules\Flight\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Flight\Models\Flight;
use Modules\Flight\Models\Seat;

class SeatSeeder extends Seeder
{
    private array $seats = [];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $bar = $this->command->getOutput()->createProgressBar(Flight::count() * 90);
        $bar->start();

        Flight::query()
            ->chunkById(100, function ($flights) use ($bar) {
                foreach ($flights as $flight) {
                    $columns = ['A', 'B', 'C', 'D', 'E', 'F'];
                    $rows = range(1, 15); // 15 rows * 6 seats = 90 seats

                    foreach ($rows as $row) {
                        foreach ($columns as $column) {
                            $this->seats[] = [
                                'flight_id' => $flight->id,
                                'seat_number' => $row.$column,
                                'is_available' => rand(1, 10) > 5,
                                'created_at' => now(),
                                'updated_at' => now(),
                            ];

                            $bar->advance();
                        }
                    }

                    Seat::insert($this->seats);
                    $this->seats = [];
                }
            });

        if (! empty($this->seats)) {
            Seat::insert($this->seats);
        }

        $bar->finish();
    }
}
