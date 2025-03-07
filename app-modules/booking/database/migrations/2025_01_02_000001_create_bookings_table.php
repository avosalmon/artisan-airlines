<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('flight_id'); // does not enforce a cross-module foreign key constraint
            $table->string('booking_reference')->unique(); // e.g., ABC123
            $table->string('status')->default('pending'); // pending, confirmed, cancelled
            $table->unsignedInteger('passenger_count');
            $table->decimal('total_amount', 10, 2);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
