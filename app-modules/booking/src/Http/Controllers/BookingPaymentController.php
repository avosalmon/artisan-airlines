<?php

declare(strict_types=1);

namespace Modules\Booking\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Booking\Models\Booking;
use Modules\Flight\Contracts\FlightRepository;
use Modules\Payment\Contracts\Payment;

class BookingPaymentController
{
    public function create(Booking $booking, FlightRepository $flightRepository): Response
    {
        $flight = $flightRepository->find($booking->flight_id);

        return Inertia::render('booking::payment/create', [
            'booking' => $booking,
            'flight' => $flight,
        ]);
    }

    public function store(Booking $booking, Request $request, Payment $payment): RedirectResponse
    {
        $payment->process($booking->total_amount, $booking->booking_reference);

        return redirect()->route('booking.show', $booking);
    }
}
