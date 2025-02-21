<?php

declare(strict_types=1);

arch()
    ->expect('ArtisanAir\Payment')
    ->toOnlyBeUsedIn('ArtisanAir\Payment')
    ->ignoring([
        'ArtisanAir\Payment\Contracts',
        'ArtisanAir\Payment\DataTransferObjects',
        'ArtisanAir\Payment\Events',
        'ArtisanAir\Payment\Enums',
        'ArtisanAir\Payment\Exceptions',
    ]);
