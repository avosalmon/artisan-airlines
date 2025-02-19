<?php

declare(strict_types=1);

namespace Modules\Booking\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Modules\Booking\Http\Requests\StorePendingBookingRequest;
use Modules\Booking\Models\Booking;
use Modules\Flight\Contracts\FlightRepository;

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
