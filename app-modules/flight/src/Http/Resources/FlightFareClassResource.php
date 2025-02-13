<?php

declare(strict_types=1);

namespace Modules\Flight\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FlightFareClassResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'fare_class' => $this->fare_class,
            'price' => $this->price,
        ];
    }
}
