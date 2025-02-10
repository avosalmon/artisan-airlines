<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use Modules\Booking\Http\Controllers\BookingPassengerController;
use Modules\Booking\Http\Controllers\PendingBookingController;

Route::middleware('web')->group(function () {
    Route::post('/bookings/pending', [PendingBookingController::class, 'store'])->name('booking.pending.store');
    Route::get('/bookings/{booking}/passengers', [BookingPassengerController::class, 'create'])->name('booking.passenger.create');
});
