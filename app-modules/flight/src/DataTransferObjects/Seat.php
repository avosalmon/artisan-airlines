<?php

declare(strict_types=1);

namespace ArtisanAir\Flight\DataTransferObjects;

readonly class Seat
{
    public function __construct(
        public int $id,
        public string $seat_number,
        public bool $is_available,
    ) {}
}
