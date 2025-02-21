<?php

declare(strict_types=1);

namespace ArtisanAir\Flight\Enums;

enum FlightStatus: string
{
    case SCHEDULED = 'scheduled';
    case DELAYED = 'delayed';
    case CANCELLED = 'cancelled';
    case IN_PROGRESS = 'in_progress';
    case COMPLETED = 'completed';

    public function label(): string
    {
        return match ($this) {
            self::SCHEDULED => 'Scheduled',
            self::DELAYED => 'Delayed',
            self::CANCELLED => 'Cancelled',
            self::IN_PROGRESS => 'In Progress',
            self::COMPLETED => 'Completed',
        };
    }
}
