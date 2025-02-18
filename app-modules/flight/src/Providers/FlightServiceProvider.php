<?php

declare(strict_types=1);

namespace Modules\Flight\Providers;

use Illuminate\Support\ServiceProvider;
use Modules\Flight\Contracts\FlightRepository as FlightRepositoryContract;
use Modules\Flight\Contracts\SeatRepository as SeatRepositoryContract;
use Modules\Flight\Repositories\FlightRepository;
use Modules\Flight\Repositories\SeatRepository;

class FlightServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(FlightRepositoryContract::class, FlightRepository::class);
        $this->app->bind(SeatRepositoryContract::class, SeatRepository::class);
    }

    public function boot(): void {}
}
