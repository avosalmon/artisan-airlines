<?php

declare(strict_types=1);

namespace Modules\Flight\Contracts;

use Modules\Flight\Exceptions\SeatUnavailableException;

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
