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
        $flight = $flightRepository->findByFareClassId($request->integer('fare_class_id'));

        if (! $flight) {
            return back()->with('error', 'Flight not found');
        }

        $booking = Booking::create([
            'flight_fare_class_id' => $request->integer('fare_class_id'),
            'passenger_count' => $request->integer('passenger_count'),
            'total_amount' => $flight->price * $request->integer('passenger_count'),
        ]);

        return to_route('booking.passengers.create', $booking);
    }
}
