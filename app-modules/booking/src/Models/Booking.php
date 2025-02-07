<?php

declare(strict_types=1);

namespace Modules\Booking\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Modules\Booking\Enums\BookingStatus;
use Modules\Booking\Enums\PaymentStatus;
use Modules\Flight\Models\FlightFareClass;

class Booking extends Model
{
    protected $fillable = [
        'booking_reference',
        'flight_fare_class_id',
        'contact_email',
        'contact_phone',
        'status',
        'total_amount',
    ];

    protected $casts = [
        'status' => BookingStatus::class,
    ];

    protected static function booted(): void
    {
        static::creating(function (Booking $booking) {
            if (! $booking->booking_reference) {
                $booking->booking_reference = self::generateBookingReference();
            }
        });
    }

    /**
     * Generate a random booking reference. e.g., ABC12345
     */
    private static function generateBookingReference(): string
    {
        return strtoupper(
            substr(str_shuffle('ABCDEFGHIJKLMNOPQRSTUVWXYZ'), 0, 3)
            .str_pad((string) mt_rand(0, 99999), 5, '0', STR_PAD_LEFT)
        );
    }

    public function flightFareClass(): BelongsTo
    {
        return $this->belongsTo(FlightFareClass::class);
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
