<?php

declare(strict_types=1);

namespace ArtisanAir\Booking\Http\Controllers;

use ArtisanAir\Booking\Http\Requests\StorePendingBookingRequest;
use ArtisanAir\Booking\Models\Booking;
use ArtisanAir\Flight\Contracts\FlightRepository;
use Illuminate\Http\RedirectResponse;

class PendingBookingController
{
    public function store(StorePendingBookingRequest $request, FlightRepository $flightRepository): RedirectResponse
    {
        $flight = $flightRepository->find($request->integer('flight_id'));

        if (! $flight) {
            return back()->with('error', 'Flight not found');
        }

        $booking = Booking::create([
            'flight_id' => $request->integer('flight_id'),
            'passenger_count' => $request->integer('passengers'),
            'total_amount' => $flight->price * $request->integer('passengers'),
        ]);

        return to_route('booking.passenger.create', $booking);
    }
}
