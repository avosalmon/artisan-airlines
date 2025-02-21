<?php

declare(strict_types=1);

namespace ArtisanAir\Flight\Http\Controllers;

use ArtisanAir\Flight\Enums\FlightStatus;
use ArtisanAir\Flight\Http\Requests\SearchFlightRequest;
use ArtisanAir\Flight\Http\Resources\FlightResource;
use ArtisanAir\Flight\Models\Flight;
use Inertia\Inertia;
use Inertia\Response;

class SearchController
{
    public function index(SearchFlightRequest $request): Response
    {
        $flights = Flight::query()
            ->with(['originAirport', 'destinationAirport', 'aircraftType'])
            ->where('origin_airport_id', $request->integer('origin_airport_id'))
            ->where('destination_airport_id', $request->integer('destination_airport_id'))
            ->whereDate('departure_time', $request->date('departure_date'))
            ->status(FlightStatus::SCHEDULED)
            ->has('availableSeats', '>=', $request->integer('passengers'))
            ->get();

        return Inertia::render('flight::search/index', [
            'flights' => FlightResource::collection($flights),
            'passengers' => $request->integer('passengers'),
        ]);
    }
}
