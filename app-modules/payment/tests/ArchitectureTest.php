<?php

declare(strict_types=1);

arch()
    ->expect('Modules\Payment')
    ->toOnlyBeUsedIn('Modules\Payment')
    ->ignoring([
        'Modules\Payment\Contracts',
        'Modules\Payment\DataTransferObjects',
        'Modules\Payment\Events',
        'Modules\Payment\Enums',
        'Modules\Payment\Exceptions',
    ]);
