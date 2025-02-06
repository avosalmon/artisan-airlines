<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('flights', function (Blueprint $table) {
            $table->id();
            $table->string('flight_number', 10); // e.g., NH101
            $table->foreignId('origin_airport_id')->constrained('airports');
            $table->foreignId('destination_airport_id')->constrained('airports');
            $table->foreignId('aircraft_type_id')->constrained('aircraft_types');
            $table->dateTime('departure_time');
            $table->dateTime('arrival_time');
            $table->decimal('base_price', 10, 2);
            $table->string('status')->default('scheduled'); // scheduled, delayed, cancelled, completed
            $table->integer('available_seats');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('flights');
    }
};
