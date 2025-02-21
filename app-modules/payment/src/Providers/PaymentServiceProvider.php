<?php

declare(strict_types=1);

namespace ArtisanAir\Payment\Providers;

use ArtisanAir\Payment\Contracts\Payment as PaymentContract;
use ArtisanAir\Payment\Services\FakePaymentService;
use Illuminate\Support\ServiceProvider;

class PaymentServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(PaymentContract::class, FakePaymentService::class);
    }

    public function boot(): void {}
}
