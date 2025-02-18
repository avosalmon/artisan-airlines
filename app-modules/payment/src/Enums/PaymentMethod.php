<?php

declare(strict_types=1);

namespace Modules\Payment\Enums;

enum PaymentMethod: string
{
    case CREDIT_CARD = 'credit_card';
    case PAYPAL = 'paypal';
}
