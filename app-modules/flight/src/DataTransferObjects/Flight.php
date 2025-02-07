<?php

declare(strict_types=1);

namespace Modules\Flight\DataTransferObjects;

use Carbon\Carbon;
use Modules\Flight\Enums\FareClass;

readonly class Flight
{
    public function __construct(
        public int $id,
        public string $flight_number,
        public Airport $origin_airport,
        public Airport $destination_airport,
        public Carbon $departure_time,
        public Carbon $arrival_time,
        public FareClass $fare_class,
        public string $price,
        public int $available_seats,
    ) {}
}
