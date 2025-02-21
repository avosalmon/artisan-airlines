<?php

declare(strict_types=1);

namespace ArtisanAir\Checkin\Listeners;

use ArtisanAir\Booking\Events\BookingConfirmed;
use ArtisanAir\Checkin\Models\CheckinReminder;
use ArtisanAir\Flight\Contracts\FlightRepository;
use Carbon\Carbon;
use Illuminate\Contracts\Queue\ShouldQueue;
use RuntimeException;

class CreateCheckInReminder implements ShouldQueue
{
    /**
     * Create the event listener.
     */
    public function __construct(private FlightRepository $flightRepository)
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(BookingConfirmed $event): void
    {
        $flight = $this->flightRepository->find($event->flightId);

        if (! $flight) {
            throw new RuntimeException("Flight not found: {$event->flightId}");
        }

        CheckinReminder::create([
            'flight_id' => $flight->id,
            'booking_id' => $event->bookingId,
            'scheduled_at' => Carbon::parse($flight->departure_time)->subDays(3),
        ]);
    }
}
