This is a fictitious airline booking application to demonstrate a modular Inertia application.

The application has the following modules:

- Flight module
  - Manage flights, airports, seat availability, schedules, etc
- Booking module
  - Manage bookings, passengers, etc
- Check-in module
  - Manage check-ins, boarding passes, etc
- Payment module
  - Manage payments, refunds, etc
- Loyalty module (if time allows)
  - Tracks miles earned from flights
  - Manages member tiers and benefits
  - Handles point redemptions
  - Processes tier upgrades

# Scenarios

## Booking a flight

- Flight module
  - The user searches for flights
  - The user selects a flight
  - The user is redirected to the booking page under the booking module
- Booking module
  - The user provides the passenger details
  - The user selects the seats
    - Check seat availability with flight module
    - Flight module returns a list of available seats
  - The user makes a payment
    - The booking module makes a payment with the payment module
    - The payment module returns a payment result
    - Rollback the transaction if the payment fails
  - Create a booking record
  - Dispatch `BookingCreated` event
  - The flight module listens to the `BookingCreated` event and updates the seat availability

## Online check-in

- Check-in module
  - Listen to the `BookingCreated` event
  - Send a check-in reminder email
  - The user checks in by providing the booking reference number
  - Dispatch `CheckInCompleted` event
  - Generate a boarding pass
- Flight module
  - Listen to the `CheckInCompleted` event
  - Update the flight status
