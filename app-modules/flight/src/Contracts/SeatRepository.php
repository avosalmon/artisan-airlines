<?php

declare(strict_types=1);

namespace ArtisanAir\Flight\Contracts;

use ArtisanAir\Flight\Exceptions\SeatUnavailableException;

interface SeatRepository
{
    /**
     * Mark the seat as booked.
     *
     * @param  int|array<int>  $seatId
     *
     * @throws SeatUnavailableException
     */
    public function markAsBooked(int|array $seatId): void;
}
