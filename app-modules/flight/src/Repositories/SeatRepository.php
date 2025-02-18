<?php

declare(strict_types=1);

namespace Modules\Flight\Repositories;

use Modules\Flight\Contracts\SeatRepository as Contract;
use Modules\Flight\Models\Seat;

class SeatRepository implements Contract
{
    /**
     * Mark the seat as booked.
     *
     * @param  int|array<int>  $seatId
     */
    public function markAsBooked(int|array $seatId): void
    {
        if (! is_array($seatId)) {
            $seatId = [$seatId];
        }

        Seat::whereIn('id', $seatId)->update(['is_available' => false]);
    }
}
