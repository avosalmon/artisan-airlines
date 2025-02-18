<?php

declare(strict_types=1);

namespace Modules\Payment\Contracts;

interface Payment
{
    public function process(float $amount, string $reference): bool;
}
