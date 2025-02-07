<?php

declare(strict_types=1);

namespace Modules\Flight\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Modules\Flight\Enums\FlightStatus;
use Modules\Flight\Http\Requests\SearchFlightRequest;
use Modules\Flight\Http\Resources\FlightResource;
use Modules\Flight\Models\Flight;

class SearchController
{
    public function index(SearchFlightRequest $request): Response
    {
        $flights = Flight::query()
            ->with(['originAirport', 'destinationAirport', 'aircraftType', 'fareClasses'])
            ->where('origin_airport_id', $request->integer('origin_airport_id'))
            ->where('destination_airport_id', $request->integer('destination_airport_id'))
            ->whereDate('departure_time', $request->date('departure_date'))
            ->where('available_seats', '>', $request->integer('passengers'))
            ->status(FlightStatus::SCHEDULED)
            ->get();

        return Inertia::render('flight::search/index', [
            'flights' => FlightResource::collection($flights),
            'passengers' => $request->integer('passengers'),
        ]);
    }
}
