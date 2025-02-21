<?php

declare(strict_types=1);

namespace ArtisanAir\Booking\Http\Requests;

use Carbon\Carbon;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreBookingPassengerRequest extends FormRequest
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
            'passengers' => ['required', 'array', 'min:1'],
            'passengers.*.first_name' => ['required', 'string', 'max:255'],
            'passengers.*.last_name' => ['required', 'string', 'max:255'],
            'passengers.*.email' => ['required', 'email', 'max:255'],
            'passengers.*.phone' => ['required', 'string', 'max:255'],
            'passengers.*.date_of_birth' => ['required', 'date_format:d/m/Y'],
            'passengers.*.gender' => ['required', Rule::in(['male', 'female', 'other'])],
            'passengers.*.nationality' => ['required', 'string', 'max:255'],
            'passengers.*.passport_number' => ['required', 'string', 'max:255'],
        ];
    }

    protected function passedValidation(): void
    {
        $passengers = collect($this->validated('passengers'))->map(function ($passenger) {
            $passenger['date_of_birth'] = Carbon::createFromFormat('d/m/Y', $passenger['date_of_birth'])->format('Y-m-d');

            return $passenger;
        })->all();

        $this->replace(['passengers' => $passengers]);
    }
}
