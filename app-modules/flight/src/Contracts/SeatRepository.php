<?php

declare(strict_types=1);

namespace Modules\Flight\Contracts;

interface SeatRepository
{
    /**
     * Mark the seat as booked.
     *
     * @param  int|array<int>  $seatId
     */
    public function markAsBooked(int|array $seatId): void;
}
