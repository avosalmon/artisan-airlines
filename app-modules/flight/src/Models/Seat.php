<?php

declare(strict_types=1);

namespace ArtisanAir\Flight\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Seat extends Model
{
    protected $fillable = [
        'flight_id',
        'seat_number',
        'is_available',
    ];

    protected $casts = [
        'is_available' => 'boolean',
    ];

    public function scopeAvailable(Builder $query): Builder
    {
        return $query->where('is_available', true);
    }

    public function flight(): BelongsTo
    {
        return $this->belongsTo(Flight::class);
    }
}
