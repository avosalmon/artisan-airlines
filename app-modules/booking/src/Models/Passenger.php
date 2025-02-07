<?php

declare(strict_types=1);

namespace Modules\Booking\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Passenger extends Model
{
    protected $fillable = [
        'booking_id',
        'first_name',
        'last_name',
        'email',
        'phone',
        'date_of_birth',
        'gender',
        'nationality',
        'passport_number',
    ];

    protected $casts = [
        'date_of_birth' => 'date',
    ];

    public const GENDER_MALE = 'male';

    public const GENDER_FEMALE = 'female';

    public const GENDER_OTHER = 'other';

    public function booking(): BelongsTo
    {
        return $this->belongsTo(Booking::class);
    }

    public function seatAssignment(): HasOne
    {
        return $this->hasOne(SeatAssignment::class);
    }
}
