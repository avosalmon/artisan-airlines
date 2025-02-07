<?php

declare(strict_types=1);

namespace Modules\Booking\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Modules\Booking\Enums\BookingStatus;
use Modules\Booking\Enums\PaymentStatus;
use Modules\Flight\Models\Flight;

class Booking extends Model
{
    protected $fillable = [
        'booking_reference',
        'flight_id',
        'contact_email',
        'contact_phone',
        'status',
        'total_amount',
    ];

    protected $casts = [
        'status' => BookingStatus::class,
    ];

    public function flight(): BelongsTo
    {
        return $this->belongsTo(Flight::class);
    }

    public function passengers(): HasMany
    {
        return $this->hasMany(Passenger::class);
    }

    public function seatAssignments(): HasMany
    {
        return $this->hasMany(SeatAssignment::class);
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    public function successfulPayment(): ?Payment
    {
        return $this->payments()
            ->where('status', PaymentStatus::COMPLETED)
            ->latest()
            ->first();
    }

    public function isFullyPaid(): bool
    {
        return $this->successfulPayment()?->amount === $this->total_amount;
    }
}
