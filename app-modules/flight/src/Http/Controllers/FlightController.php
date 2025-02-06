<?php

declare(strict_types=1);

namespace Modules\Flight\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Modules\Flight\Models\Airport;

class FlightController
{
    public function index(): Response
    {
        $airports = Airport::select(['id', 'iata_code', 'name', 'city', 'country'])
            ->orderBy('name')
            ->get();

        return Inertia::render('flight::index', [
            'airports' => $airports,
        ]);
    }
}
