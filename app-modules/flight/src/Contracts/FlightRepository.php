<?php

declare(strict_types=1);

namespace Modules\Flight\Contracts;

use Modules\Flight\DataTransferObjects\Flight;

interface FlightRepository
{
    public function find(int $flightId): ?Flight;
}
