<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use Modules\Booking\Http\Controllers\BookingPassengerController;
use Modules\Booking\Http\Controllers\BookingPaymentController;
use Modules\Booking\Http\Controllers\PendingBookingController;
use Modules\Booking\Http\Controllers\SeatAssignmentController;

Route::middleware('web')->group(function () {
    Route::post('/bookings/pending', [PendingBookingController::class, 'store'])->name('booking.pending.store');
    Route::get('/bookings/{booking}/passengers', [BookingPassengerController::class, 'create'])->name('booking.passenger.create');
    Route::post('/bookings/{booking}/passengers', [BookingPassengerController::class, 'store'])->name('booking.passenger.store');
    Route::get('/bookings/{booking}/seats', [SeatAssignmentController::class, 'create'])->name('booking.seat.create');
    Route::post('/bookings/{booking}/seats', [SeatAssignmentController::class, 'store'])->name('booking.seat.store');
    Route::get('/bookings/{booking}/payment', [BookingPaymentController::class, 'create'])->name('booking.payment.create');
    Route::post('/bookings/{booking}/payment', [BookingPaymentController::class, 'store'])->name('booking.payment.store');
});
