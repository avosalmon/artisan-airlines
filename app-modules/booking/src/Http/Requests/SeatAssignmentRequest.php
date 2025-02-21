<?php

declare(strict_types=1);

namespace ArtisanAir\Booking\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SeatAssignmentRequest extends FormRequest
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
            'seat_assignments' => ['required', 'array', 'min:1'],
            'seat_assignments.*.passenger_id' => ['required', Rule::exists('passengers', 'id')],
            'seat_assignments.*.seat_id' => ['required', 'integer'],
        ];
    }
}
