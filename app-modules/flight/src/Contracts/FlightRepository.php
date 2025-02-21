<?php

declare(strict_types=1);

namespace ArtisanAir\Flight\Contracts;

use ArtisanAir\Flight\DataTransferObjects\Flight;

interface FlightRepository
{
    public function find(int $flightId): ?Flight;
}
