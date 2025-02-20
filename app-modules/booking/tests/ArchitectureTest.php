<?php

declare(strict_types=1);

arch()
    ->expect('Modules\Booking')
    ->toOnlyBeUsedIn('Modules\Booking')
    ->ignoring([
        'Modules\Booking\Contracts',
        'Modules\Booking\DataTransferObjects',
        'Modules\Booking\Events',
        'Modules\Booking\Enums',
        'Modules\Booking\Exceptions',
    ]);
