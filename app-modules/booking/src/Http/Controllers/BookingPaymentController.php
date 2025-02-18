<?php

declare(strict_types=1);

namespace Modules\Booking\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Booking\Enums\BookingStatus;
use Modules\Booking\Http\Requests\StorePaymentRequest;
use Modules\Booking\Models\Booking;
use Modules\Flight\Contracts\FlightRepository;
use Modules\Payment\Contracts\Payment;
use Throwable;

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

    public function store(Booking $booking, StorePaymentRequest $request, Payment $payment): RedirectResponse
    {
        try {
            DB::transaction(function () use ($booking, $request, $payment) {
                // TODO: Secure the seats

                $booking->update([
                    'status' => BookingStatus::CONFIRMED,
                ]);

                $payment->process(
                    $request->input('token'),
                    (float) $booking->total_amount,
                    $booking->booking_reference,
                );
            });
        } catch (Throwable $e) {
            Log::error('Booking payment failed', [
                'booking_id' => $booking->id,
                'error' => $e->getMessage(),
            ]);

            return redirect()->back()->with('error', 'Payment failed. Please try again.');
        }

        return redirect()->route('booking.show', $booking);
    }
}
