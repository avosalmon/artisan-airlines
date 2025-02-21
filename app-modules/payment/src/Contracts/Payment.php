<?php

declare(strict_types=1);

namespace ArtisanAir\Payment\Contracts;

use ArtisanAir\Payment\Exceptions\PaymentException;

interface Payment
{
    /**
     * Process the payment and return the payment ID.
     *
     * @throws PaymentException
     */
    public function process(int $bookingId, float $amount, string $token): int;
}
