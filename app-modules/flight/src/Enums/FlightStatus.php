<?php

declare(strict_types=1);

namespace Modules\Flight\Enums;

enum FlightStatus: string
{
    case SCHEDULED = 'scheduled';
    case DELAYED = 'delayed';
    case CANCELLED = 'cancelled';
    case COMPLETED = 'completed';

    public function label(): string
    {
        return match ($this) {
            self::SCHEDULED => 'Scheduled',
            self::DELAYED => 'Delayed',
            self::CANCELLED => 'Cancelled',
            self::COMPLETED => 'Completed',
        };
    }
}
