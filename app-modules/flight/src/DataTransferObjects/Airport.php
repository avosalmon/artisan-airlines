<?php

declare(strict_types=1);

namespace ArtisanAir\Flight\DataTransferObjects;

readonly class Airport
{
    public function __construct(
        public int $id,
        public string $iata_code,
        public string $name,
        public string $city,
        public string $country,
        public string $timezone,
    ) {}
}
