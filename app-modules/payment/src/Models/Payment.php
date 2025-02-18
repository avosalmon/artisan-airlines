<?php

declare(strict_types=1);

namespace Modules\Payment\Models;

use Illuminate\Database\Eloquent\Model;
use Modules\Payment\Enums\PaymentMethod;
use Modules\Payment\Enums\PaymentStatus;

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
