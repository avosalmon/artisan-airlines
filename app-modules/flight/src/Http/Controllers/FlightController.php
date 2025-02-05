<?php

declare(strict_types=1);

namespace Modules\Flight\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class FlightController
{
    public function index(): Response
    {
        return Inertia::render('flight::flight/index');
    }
}
