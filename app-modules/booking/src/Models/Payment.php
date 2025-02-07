<?php

declare(strict_types=1);

namespace Modules\Booking\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Modules\Booking\Enums\PaymentStatus;

class Payment extends Model
{
    protected $fillable = [
        'booking_id',
        'payment_method',
        'transaction_id',
        'amount',
        'status',
        'payment_details',
    ];

    protected $casts = [
        'payment_details' => 'json',
        'amount' => 'decimal:2',
        'status' => PaymentStatus::class,
    ];

    public function booking(): BelongsTo
    {
        return $this->belongsTo(Booking::class);
    }
}
