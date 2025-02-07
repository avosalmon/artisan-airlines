<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('seat_assignments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('booking_id')->constrained()->cascadeOnDelete();
            $table->foreignId('passenger_id')->constrained()->cascadeOnDelete();
            $table->string('seat_number');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('seat_assignments');
    }
};
