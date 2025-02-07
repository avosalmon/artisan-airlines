<?php

declare(strict_types=1);

namespace Modules\Booking\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Booking\Enums\BookingStatus;
use Modules\Booking\Models\Booking;
use Modules\Flight\Contracts\FlightRepository;

class BookingController extends Controller
{
    public function __construct(
        private readonly FlightRepository $flightRepository,
    ) {}

    public function create(Booking $booking): Response
    {
        abort_unless($booking->status === BookingStatus::PENDING, 404);

        $flight = $this->flightRepository->findByFareClassId($booking->flight_fare_class_id);

        return Inertia::render('booking::create', [
            'booking' => $booking,
            'flight' => $flight,
        ]);
    }
}
