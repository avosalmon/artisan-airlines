#!/bin/bash

cp .env.example .env
touch database/database.sqlite
composer install
php artisan key:generate
php artisan migrate:fresh --seed
npm install
