<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use Modules\Flight\Http\Controllers\FlightController;
use Modules\Flight\Http\Controllers\SearchController;

Route::get('/', [FlightController::class, 'index']);
Route::get('/flights/search', [SearchController::class, 'index']);
