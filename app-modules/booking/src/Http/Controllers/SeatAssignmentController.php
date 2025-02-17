<?php

declare(strict_types=1);

namespace Modules\Booking\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Booking\Enums\BookingStatus;
use Modules\Booking\Http\Requests\SeatAssignmentRequest;
use Modules\Booking\Models\Booking;
use Modules\Booking\Models\SeatAssignment;
use Modules\Flight\Contracts\FlightRepository;

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

        SeatAssignment::createMany($request->input('seat_assignments'));

        return to_route('booking.payment.create', $booking);
    }
}
