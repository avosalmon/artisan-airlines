<?php

declare(strict_types=1);

namespace Modules\Payment\Contracts;

interface Payment
{
    /**
     * Process the payment and return the payment ID.
     */
    public function process(string $token, float $amount, string $reference): int;
}
