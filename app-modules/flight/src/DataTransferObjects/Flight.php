<?php

declare(strict_types=1);

namespace Modules\Flight\DataTransferObjects;

use Carbon\Carbon;

readonly class Flight
{
    /**
     * @param  ?Seat[]  $seats
     */
    public function __construct(
        public int $id,
        public string $flight_number,
        public Airport $origin_airport,
        public Airport $destination_airport,
        public Carbon $departure_time,
        public Carbon $arrival_time,
        public string $price,
        public ?array $seats = null,
    ) {}
}
