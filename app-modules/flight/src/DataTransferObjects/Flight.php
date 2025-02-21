<?php

declare(strict_types=1);

namespace ArtisanAir\Flight\DataTransferObjects;

readonly class Flight
{
    /**
     * @param  Seat[]  $seats
     */
    public function __construct(
        public int $id,
        public string $flight_number,
        public Airport $origin_airport,
        public Airport $destination_airport,
        public string $departure_time,
        public string $arrival_time,
        public string $price,
        public array $seats,
    ) {}
}
