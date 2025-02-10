<?php

declare(strict_types=1);

namespace Modules\Booking\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Booking\Enums\BookingStatus;
use Modules\Booking\Models\Booking;
use Modules\Flight\Contracts\FlightRepository;

class BookingSeatController extends Controller
{
    public function create(Booking $booking, FlightRepository $flightRepository): Response
    {
        abort_unless($booking->status === BookingStatus::PENDING, 404);

        $flight = $flightRepository->findByFareClassId($booking->flight_fare_class_id);

        return Inertia::render('booking::seat/create', [
            'booking' => $booking,
            'flight' => $flight,
        ]);
    }
}
