<?php

declare(strict_types=1);

namespace Modules\Flight\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Seat extends Model
{
    protected $fillable = [
        'flight_fare_class_id',
        'seat_number',
        'is_available',
    ];

    protected $casts = [
        'is_available' => 'boolean',
    ];

    public function flightFareClass(): BelongsTo
    {
        return $this->belongsTo(FlightFareClass::class);
    }
}
