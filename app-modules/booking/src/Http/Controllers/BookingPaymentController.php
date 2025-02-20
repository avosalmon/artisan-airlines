<?php

declare(strict_types=1);

namespace Modules\Booking\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Booking\Enums\BookingStatus;
use Modules\Booking\Events\BookingConfirmed;
use Modules\Booking\Http\Requests\StorePaymentRequest;
use Modules\Booking\Models\Booking;
use Modules\Flight\Contracts\FlightRepository;
use Modules\Flight\Contracts\SeatRepository;
use Modules\Flight\Exceptions\SeatUnavailableException;
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

    public function store(Booking $booking, StorePaymentRequest $request, Payment $payment, SeatRepository $seatRepository): RedirectResponse
    {
        $booking->load('passengers.seat');

        try {
            DB::transaction(function () use ($booking, $request, $payment, $seatRepository) {
                $seatRepository->markAsBooked(
                    $booking->passengers->pluck('seat.seat_id')->toArray()
                );

                $booking->update([
                    'status' => BookingStatus::CONFIRMED,
                ]);

                $payment->process(
                    $booking->id,
                    (float) $booking->total_amount,
                    $request->input('token'),
                );
            });
        } catch (SeatUnavailableException $e) {
            return redirect()
                ->route('booking.seat.create', $booking)
                ->with('error', 'Selected seats are no longer available. Please choose different seats.');
        } catch (Throwable $e) {
            Log::warning('Payment failed', [
                'booking_id' => $booking->id,
                'error' => $e->getMessage(),
            ]);

            return redirect()->back()->with('error', 'Payment failed. Please try again.');
        }

        event(new BookingConfirmed($booking->id, $booking->flight_id));

        return redirect()->route('booking.show', $booking);
    }
}
