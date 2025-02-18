<?php

declare(strict_types=1);

namespace Modules\Payment\Services;

use Modules\Payment\Contracts\Payment as Contract;

class PaymentService implements Contract
{
    public function process(float $amount, string $reference): bool
    {
        //
    }
}
