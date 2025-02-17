<?php

declare(strict_types=1);

namespace Modules\Booking\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Booking\Enums\BookingStatus;
use Modules\Booking\Http\Requests\StoreBookingPassengerRequest;
use Modules\Booking\Models\Booking;
use Modules\Flight\Contracts\FlightRepository;

class BookingPassengerController extends Controller
{
    public function create(Booking $booking, FlightRepository $flightRepository): Response
    {
        abort_unless($booking->status === BookingStatus::PENDING, 404);

        $flight = $flightRepository->find($booking->flight_id);

        return Inertia::render('booking::passenger/create', [
            'booking' => $booking,
            'flight' => $flight,
        ]);
    }

    public function store(Booking $booking, StoreBookingPassengerRequest $request): RedirectResponse
    {
        abort_unless($booking->status === BookingStatus::PENDING, 404);

        $booking->passengers()->createMany($request->input('passengers'));

        return to_route('booking.seat.create', $booking);
    }
}
