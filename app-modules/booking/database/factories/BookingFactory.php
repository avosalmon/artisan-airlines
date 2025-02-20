<?php

declare(strict_types=1);

namespace Modules\Booking\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Booking\Enums\BookingStatus;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\Modules\Booking\Models\Booking>
 */
class BookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'flight_id' => $this->faker->unique()->numberBetween(1, 10000),
            'booking_reference' => $this->faker->unique()->regexify('[A-Z]{3}[0-9]{5}'),
            'status' => BookingStatus::PENDING,
            'passenger_count' => $this->faker->numberBetween(1, 4),
            'total_amount' => $this->faker->randomFloat(2, 100, 1000),
        ];
    }
}
