<?php

declare(strict_types=1);

namespace Modules\Checkin\Models;

use Illuminate\Database\Eloquent\Model;

class CheckinReminder extends Model
{
    protected $fillable = [
        'flight_id',
        'booking_id',
        'scheduled_at',
    ];

    protected $casts = [
        'scheduled_at' => 'datetime',
    ];
}
