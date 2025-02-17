<?php

declare(strict_types=1);

namespace Modules\Booking\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Booking\Models\Booking;

class BookingPaymentController
{
    public function create(Booking $booking): Response
    {
        return Inertia::render('booking::payment/create', [
            'booking' => $booking,
        ]);
    }

    public function store(Booking $booking, Request $request): RedirectResponse
    {
        //
    }
}
