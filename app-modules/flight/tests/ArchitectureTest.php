<?php

declare(strict_types=1);

arch()
    ->expect('ArtisanAir\Flight')
    ->toOnlyBeUsedIn('ArtisanAir\Flight')
    ->ignoring([
        'ArtisanAir\Flight\Contracts',
        'ArtisanAir\Flight\DataTransferObjects',
        'ArtisanAir\Flight\Events',
        'ArtisanAir\Flight\Enums',
        'ArtisanAir\Flight\Exceptions',
    ]);
