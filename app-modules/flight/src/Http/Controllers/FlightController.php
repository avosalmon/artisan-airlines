<?php

declare(strict_types=1);

namespace ArtisanAir\Flight\Http\Controllers;

use ArtisanAir\Flight\Models\Airport;
use Inertia\Inertia;
use Inertia\Response;

class FlightController
{
    public function index(): Response
    {
        $airports = Airport::select(['id', 'iata_code', 'name', 'city', 'country'])
            ->orderBy('city')
            ->get();

        return Inertia::render('flight::index', [
            'airports' => $airports,
        ]);
    }
}
