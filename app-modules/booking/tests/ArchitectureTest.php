<?php

declare(strict_types=1);

arch()
    ->expect('ArtisanAir\Booking')
    ->toOnlyBeUsedIn('ArtisanAir\Booking')
    ->ignoring([
        'ArtisanAir\Booking\Contracts',
        'ArtisanAir\Booking\DataTransferObjects',
        'ArtisanAir\Booking\Events',
        'ArtisanAir\Booking\Enums',
        'ArtisanAir\Booking\Exceptions',
    ]);
