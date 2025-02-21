<?php

declare(strict_types=1);

namespace ArtisanAir\Payment\Models;

use ArtisanAir\Payment\Enums\PaymentMethod;
use ArtisanAir\Payment\Enums\PaymentStatus;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'booking_id',
        'transaction_id',
        'payment_method',
        'amount',
        'status',
    ];

    protected $casts = [
        'payment_method' => PaymentMethod::class,
        'amount' => 'decimal:2',
        'status' => PaymentStatus::class,
    ];
}
