<?php

declare(strict_types=1);

namespace ArtisanAir\Booking\Http\Controllers;

use App\Http\Controllers\Controller;
use ArtisanAir\Booking\Enums\BookingStatus;
use ArtisanAir\Booking\Http\Requests\SeatAssignmentRequest;
use ArtisanAir\Booking\Models\Booking;
use ArtisanAir\Booking\Models\SeatAssignment;
use ArtisanAir\Flight\Contracts\FlightRepository;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class SeatAssignmentController extends Controller
{
    public function create(Booking $booking, FlightRepository $flightRepository): Response
    {
        abort_unless($booking->status === BookingStatus::PENDING, 404);

        $flight = $flightRepository->find($booking->flight_id);

        return Inertia::render('booking::seat/create', [
            'booking' => $booking->load('passengers'),
            'flight' => $flight,
        ]);
    }

    public function store(Booking $booking, SeatAssignmentRequest $request): RedirectResponse
    {
        abort_unless($booking->status === BookingStatus::PENDING, 404);

        foreach ($request->input('seat_assignments') as $seatAssignment) {
            SeatAssignment::create($seatAssignment);
        }

        return to_route('booking.payment.create', $booking);
    }
}
