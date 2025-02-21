<?php

declare(strict_types=1);

namespace ArtisanAir\Flight\Exceptions;

use Exception;

class SeatUnavailableException extends Exception
{
    /**
     * @param  array<int>  $seatIds
     */
    public function __construct(array $seatIds)
    {
        parent::__construct(
            sprintf(
                'One or more seats are not available: %s',
                implode(', ', $seatIds)
            )
        );
    }
}
