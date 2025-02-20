<?php

declare(strict_types=1);

arch()
    ->expect('Modules\Flight')
    ->toOnlyBeUsedIn('Modules\Flight')
    ->ignoring([
        'Modules\Flight\Contracts',
        'Modules\Flight\DataTransferObjects',
        'Modules\Flight\Events',
        'Modules\Flight\Enums',
        'Modules\Flight\Exceptions',
    ]);
