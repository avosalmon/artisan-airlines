<?php

declare(strict_types=1);

namespace Modules\Payment\Services;

use Modules\Payment\Contracts\Payment as Contract;

class FakePaymentService implements Contract
{
    /**
     * Process the payment and return the payment ID.
     */
    public function process(string $token, float $amount, string $reference): int
    {
        sleep(3);

        return random_int(1, 1000000);
    }
}
