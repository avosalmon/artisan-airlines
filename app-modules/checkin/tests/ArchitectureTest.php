<?php

declare(strict_types=1);

arch()
    ->expect('Modules\Checkin')
    ->toOnlyBeUsedIn('Modules\Checkin')
    ->ignoring([
        'Modules\Checkin\Contracts',
        'Modules\Checkin\DataTransferObjects',
        'Modules\Checkin\Events',
        'Modules\Checkin\Enums',
        'Modules\Checkin\Exceptions',
    ]);
