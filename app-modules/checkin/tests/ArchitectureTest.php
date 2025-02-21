<?php

declare(strict_types=1);

arch()
    ->expect('ArtisanAir\Checkin')
    ->toOnlyBeUsedIn('ArtisanAir\Checkin')
    ->ignoring([
        'ArtisanAir\Checkin\Contracts',
        'ArtisanAir\Checkin\DataTransferObjects',
        'ArtisanAir\Checkin\Events',
        'ArtisanAir\Checkin\Enums',
        'ArtisanAir\Checkin\Exceptions',
    ]);
