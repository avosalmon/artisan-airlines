<?php

declare(strict_types=1);

use ArtisanAir\Flight\Http\Controllers\FlightController;
use ArtisanAir\Flight\Http\Controllers\SearchController;
use Illuminate\Support\Facades\Route;

Route::middleware('web')->group(function () {
    Route::get('/', [FlightController::class, 'index']);
    Route::get('/flights/search', [SearchController::class, 'index']);
});
