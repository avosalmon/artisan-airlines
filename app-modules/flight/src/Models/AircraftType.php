<?php

declare(strict_types=1);

namespace ArtisanAir\Flight\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AircraftType extends Model
{
    protected $fillable = [
        'code',
        'name',
        'total_seats',
    ];

    public function flights(): HasMany
    {
        return $this->hasMany(Flight::class);
    }
}
