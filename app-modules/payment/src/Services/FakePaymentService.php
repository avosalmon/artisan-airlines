<?php

declare(strict_types=1);

namespace Modules\Payment\Services;

use Modules\Payment\Contracts\Payment as Contract;
use Modules\Payment\Enums\PaymentMethod;
use Modules\Payment\Enums\PaymentStatus;
use Modules\Payment\Models\Payment;

class FakePaymentService implements Contract
{
    /**
     * Process the payment and return the payment ID.
     */
    public function process(int $bookingId, float $amount, string $token): int
    {
        sleep(3);

        $payment = Payment::create([
            'booking_id' => $bookingId,
            'transaction_id' => random_int(1, 1000000),
            'payment_method' => PaymentMethod::CREDIT_CARD,
            'amount' => $amount,
            'status' => PaymentStatus::COMPLETED,
        ]);

        return $payment->id;
    }
}
