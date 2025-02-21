<?php

declare(strict_types=1);

namespace ArtisanAir\Flight\Repositories;

use ArtisanAir\Flight\Contracts\SeatRepository as Contract;
use ArtisanAir\Flight\Exceptions\SeatUnavailableException;
use ArtisanAir\Flight\Models\Seat;

class SeatRepository implements Contract
{
    /**
     * Mark the seat as booked.
     *
     * @param  int|array<int>  $seatId
     *
     * @throws SeatUnavailableException
     */
    public function markAsBooked(int|array $seatId): void
    {
        if (! is_array($seatId)) {
            $seatId = [$seatId];
        }

        if (! $this->areSeatsAvailable($seatId)) {
            throw new SeatUnavailableException($seatId);
        }

        Seat::whereIn('id', $seatId)
            ->lockForUpdate()
            ->update(['is_available' => false]);
    }

    /**
     * Check if all the given seats are available.
     *
     * @param  array<int>  $seatIds
     */
    private function areSeatsAvailable(array $seatIds): bool
    {
        return Seat::whereIn('id', $seatIds)
            ->lockForUpdate()
            ->available()
            ->count() === count($seatIds);
    }
}
