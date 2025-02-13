<?php

declare(strict_types=1);

namespace Modules\Flight\Enums;

enum FareClass: string
{
    case ECONOMY = 'economy';
    case BUSINESS = 'business';
    case FIRST = 'first';

    public function label(): string
    {
        return match ($this) {
            self::ECONOMY => 'Economy',
            self::BUSINESS => 'Business',
            self::FIRST => 'First',
        };
    }
}
