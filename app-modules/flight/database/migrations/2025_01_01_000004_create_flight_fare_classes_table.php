<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('flight_fare_classes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('flight_id')->constrained('flights');
            $table->string('fare_class'); // economy, business, first
            $table->decimal('price', 10, 2);
            $table->integer('available_seats');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('flight_fare_classes');
    }
};
