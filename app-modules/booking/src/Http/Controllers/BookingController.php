<?php

declare(strict_types=1);

namespace Modules\Booking\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Modules\Booking\Enums\BookingStatus;
use Modules\Booking\Models\Booking;
use Modules\Flight\Contracts\FlightRepository;

class BookingController
{
    public function show(Booking $booking, FlightRepository $flightRepository): Response
    {
        if ($booking->status !== BookingStatus::CONFIRMED) {
            abort(404);
        }

        $flight = $flightRepository->find($booking->flight_id);

        return Inertia::render('booking::show', [
            'booking' => $booking->load('passengers'),
            'flight' => $flight,
        ]);
    }
}
