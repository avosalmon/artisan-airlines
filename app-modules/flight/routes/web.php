<?php

declare(strict_types=1);

use Modules\Flight\Http\Controllers\FlightController;

Route::get('/flights', [FlightController::class, 'index']);
