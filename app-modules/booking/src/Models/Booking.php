<?php

declare(strict_types=1);

namespace Modules\Booking\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Modules\Booking\Enums\BookingStatus;

class Booking extends Model
{
    protected $fillable = [
        'flight_id',
        'booking_reference',
        'contact_email',
        'contact_phone',
        'status',
        'passenger_count',
        'total_amount',
    ];

    protected $casts = [
        'status' => BookingStatus::class,
        'total_amount' => 'decimal:2',
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

    public function passengers(): HasMany
    {
        return $this->hasMany(Passenger::class);
    }
}
