<?php

declare(strict_types=1);

namespace ArtisanAir\Payment\Services;

use ArtisanAir\Payment\Contracts\Payment as Contract;
use ArtisanAir\Payment\Enums\PaymentMethod;
use ArtisanAir\Payment\Enums\PaymentStatus;
use ArtisanAir\Payment\Exceptions\PaymentException;
use ArtisanAir\Payment\Models\Payment;

class FakePaymentService implements Contract
{
    /**
     * Process the payment and return the payment ID.
     *
     * @throws PaymentException
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
