<?php

declare(strict_types=1);

use ArtisanAir\Booking\Enums\BookingStatus;
use ArtisanAir\Booking\Events\BookingConfirmed;
use ArtisanAir\Booking\Models\Booking;
use ArtisanAir\Flight\Contracts\SeatRepository;
use ArtisanAir\Flight\Exceptions\SeatUnavailableException;
use ArtisanAir\Payment\Contracts\Payment;
use ArtisanAir\Payment\Exceptions\PaymentException;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Str;

use function Pest\Laravel\mock;
use function Pest\Laravel\post;

describe('store booking payment', function () {
    it('confirms the booking', function () {
        // Arrange
        Event::fake();

        $booking = Booking::factory()->create();

        mock(SeatRepository::class)
            ->shouldReceive('markAsBooked')
            ->once();

        mock(Payment::class)
            ->shouldReceive('process')
            ->once();

        // Act
        $response = post("/bookings/{$booking->id}/payment", [
            'token' => Str::random(),
        ]);

        // Assert
        $response->assertRedirect("/bookings/{$booking->id}/success");

        expect($booking->refresh()->status)->toBe(BookingStatus::CONFIRMED);

        Event::assertDispatched(function (BookingConfirmed $event) use ($booking) {
            return $event->bookingId === $booking->id && $event->flightId === $booking->flight_id;
        });
    });

    it('redirects to seat selection page if the seat is unavailable', function () {
        // Arrange
        Event::fake();

        $booking = Booking::factory()->create();

        mock(SeatRepository::class)
            ->shouldReceive('markAsBooked')
            ->once()
            ->andThrow(new SeatUnavailableException([1]));

        mock(Payment::class)
            ->shouldNotReceive('process');

        // Act
        $response = post("/bookings/{$booking->id}/payment", [
            'token' => Str::random(),
        ]);

        // Assert
        $response->assertRedirect("/bookings/{$booking->id}/seats");

        expect($booking->refresh()->status)->toBe(BookingStatus::PENDING);

        Event::assertNotDispatched(BookingConfirmed::class);
    });

    it('rolls back the booking if the payment fails', function () {
        // Arrange
        Event::fake();

        $booking = Booking::factory()->create();

        mock(SeatRepository::class)
            ->shouldReceive('markAsBooked')
            ->once();

        mock(Payment::class)
            ->shouldReceive('process')
            ->once()
            ->andThrow(new PaymentException);

        // Act
        $response = post("/bookings/{$booking->id}/payment", [
            'token' => Str::random(),
        ]);

        // Assert
        $response->assertRedirect("/bookings/{$booking->id}/payment");

        expect($booking->refresh()->status)->toBe(BookingStatus::PENDING);

        Event::assertNotDispatched(BookingConfirmed::class);
    });

});
