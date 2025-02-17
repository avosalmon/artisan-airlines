<?php

declare(strict_types=1);

namespace Modules\Flight\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Modules\Flight\Enums\FlightStatus;

class Flight extends Model
{
    protected $fillable = [
        'flight_number',
        'origin_airport_id',
        'destination_airport_id',
        'aircraft_type_id',
        'departure_time',
        'arrival_time',
        'price',
        'status',
    ];

    protected $casts = [
        'departure_time' => 'datetime',
        'arrival_time' => 'datetime',
        'price' => 'decimal:2',
        'status' => FlightStatus::class,
    ];

    public function scopeStatus(Builder $query, FlightStatus $status): Builder
    {
        return $query->where('status', $status);
    }

    public function originAirport(): BelongsTo
    {
        return $this->belongsTo(Airport::class, 'origin_airport_id');
    }

    public function destinationAirport(): BelongsTo
    {
        return $this->belongsTo(Airport::class, 'destination_airport_id');
    }

    public function aircraftType(): BelongsTo
    {
        return $this->belongsTo(AircraftType::class);
    }

    public function seats(): HasMany
    {
        return $this->hasMany(Seat::class);
    }

    public function availableSeats(): HasMany
    {
        return $this->seats()->available();
    }
}
