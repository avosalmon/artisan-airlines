<?php

declare(strict_types=1);

namespace Modules\Payment\Providers;

use Illuminate\Support\ServiceProvider;
use Modules\Payment\Contracts\Payment as PaymentContract;
use Modules\Payment\Services\FakePaymentService;

class PaymentServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(PaymentContract::class, FakePaymentService::class);
    }

    public function boot(): void {}
}
