<?php

declare(strict_types=1);

namespace ArtisanAir\Booking\Http\Controllers;

use ArtisanAir\Booking\Enums\BookingStatus;
use ArtisanAir\Booking\Models\Booking;
use ArtisanAir\Flight\Contracts\FlightRepository;
use Inertia\Inertia;
use Inertia\Response;

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
