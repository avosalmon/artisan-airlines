<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use Modules\Flight\Http\Controllers\FlightController;

Route::get('/', [FlightController::class, 'index']);
