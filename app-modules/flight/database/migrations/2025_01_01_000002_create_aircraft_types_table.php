<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('aircraft_types', function (Blueprint $table) {
            $table->id();
            $table->string('code', 10); // e.g., B737, A320
            $table->string('name');
            $table->integer('total_seats');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('aircraft_types');
    }
};
