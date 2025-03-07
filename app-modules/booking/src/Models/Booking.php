<?php

declare(strict_types=1);

namespace ArtisanAir\Booking\Models;

use ArtisanAir\Booking\Enums\BookingStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'flight_id',
        'booking_reference',
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
