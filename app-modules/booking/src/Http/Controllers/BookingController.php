<?php

declare(strict_types=1);

namespace Modules\Booking\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Modules\Booking\Enums\BookingStatus;
use Modules\Booking\Models\Booking;

class BookingController
{
    public function show(Booking $booking): Response
    {
        if ($booking->status !== BookingStatus::CONFIRMED) {
            abort(404);
        }

        return Inertia::render('booking::show', [
            'booking' => $booking,
        ]);
    }
}
