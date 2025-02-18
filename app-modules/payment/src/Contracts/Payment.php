<?php

declare(strict_types=1);

namespace Modules\Payment\Contracts;

interface Payment
{
    /**
     * Process the payment and return the payment ID.
     */
    public function process(int $bookingId, float $amount, string $token): int;
}
