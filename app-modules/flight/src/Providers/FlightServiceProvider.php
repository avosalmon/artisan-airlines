<?php

declare(strict_types=1);

namespace Modules\Flight\Providers;

use Illuminate\Support\ServiceProvider;
use Modules\Flight\Contracts\FlightRepository as FlightRepositoryContract;
use Modules\Flight\Repositories\FlightRepository;

class FlightServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(FlightRepositoryContract::class, FlightRepository::class);
    }

    public function boot(): void {}
}
