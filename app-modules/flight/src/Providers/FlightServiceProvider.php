<?php

declare(strict_types=1);

namespace ArtisanAir\Flight\Providers;

use ArtisanAir\Flight\Contracts\FlightRepository as FlightRepositoryContract;
use ArtisanAir\Flight\Contracts\SeatRepository as SeatRepositoryContract;
use ArtisanAir\Flight\Repositories\FlightRepository;
use ArtisanAir\Flight\Repositories\SeatRepository;
use Illuminate\Support\ServiceProvider;

class FlightServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(FlightRepositoryContract::class, FlightRepository::class);
        $this->app->bind(SeatRepositoryContract::class, SeatRepository::class);
    }

    public function boot(): void {}
}
