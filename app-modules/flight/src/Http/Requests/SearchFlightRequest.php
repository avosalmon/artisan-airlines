<?php

declare(strict_types=1);

namespace Modules\Flight\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class SearchFlightRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'origin_airport_id' => ['required', 'integer', 'exists:airports,id'],
            'destination_airport_id' => ['required', 'integer', 'exists:airports,id'],
            'departure_date' => ['required', 'date'],
            'passengers' => ['required', 'integer', 'min:1'],
        ];
    }
}
