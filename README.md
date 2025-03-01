# Artisan Airlines

<p align="center"><img src="/art/artisan-airlines.jpg" alt="Artisan Airlines"></p>

This is a fictitious airline booking application to demonstrate a modular Inertia application.

## Setup the project

```
./install.sh
```

## Run the application

```
composer dev
```

## Run the tests

```
composer test
```

## Modules

The application has the following modules:

- Flight module
  - Manage flights, airports, seat availability, schedules, etc
- Booking module
  - Manage bookings, passengers, etc
- Payment module
  - Manage payments, refunds, etc
- Check-in module
  - Manage check-ins, boarding passes, etc

## Add a new module

```
php artisan make:module my-module
```
