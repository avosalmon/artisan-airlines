<?php

declare(strict_types=1);

namespace ArtisanAir\Booking\Http\Controllers;

use ArtisanAir\Booking\Enums\BookingStatus;
use ArtisanAir\Booking\Events\BookingConfirmed;
use ArtisanAir\Booking\Http\Requests\StorePaymentRequest;
use ArtisanAir\Booking\Models\Booking;
use ArtisanAir\Flight\Contracts\FlightRepository;
use ArtisanAir\Flight\Contracts\SeatRepository;
use ArtisanAir\Flight\Exceptions\SeatUnavailableException;
use ArtisanAir\Payment\Contracts\Payment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Nightwatch\Facades\Nightwatch;
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

    public function store(Booking $booking, StorePaymentRequest $request, SeatRepository $seatRepository, Payment $payment): RedirectResponse
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
            Nightwatch::report($e);

            return redirect()
                ->route('booking.payment.create', $booking)
                ->with('error', 'Payment failed. Please try again.');
        }

        event(new BookingConfirmed($booking->id, $booking->flight_id));

        return redirect()->route('booking.show', $booking);
    }
}
