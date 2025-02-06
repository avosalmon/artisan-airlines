<?php

declare(strict_types=1);

namespace Modules\Flight\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Modules\Flight\Enums\FareClass;

class FlightPrice extends Model
{
    protected $fillable = [
        'flight_id',
        'fare_class',
        'price',
        'available_seats',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'fare_class' => FareClass::class,
    ];

    public function flight(): BelongsTo
    {
        return $this->belongsTo(Flight::class);
    }
}
