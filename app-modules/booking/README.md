This document describes the process of booking a flight.

## Passenger details

- The user navigates to the flight booking page from the flight search results page
- The user provides the passenger details for each passenger
  - Name
  - Email
  - Phone number
  - Date of birth
  - Gender
  - Nationality
  - Passport number
- The user clicks the "proceed" button
- The user is redirected to the seat selection page

## Seat selection

- The user sees the seat map
- The user selects the seats
- The user clicks the "proceed" button
- The user is redirected to the payment page

## Payment

- The user provides the payment details
- The user clicks the "proceed" button
- The user is redirected to the booking confirmation page

## Booking confirmation

- The user sees the booking details
- The user clicks the "confirm" button
- The system checks if the seats are still available via the flight module
- The payment is processed and the booking is confirmed
- The `BookingConfirmed` event is dispatched and the flight module decrements the available seats
- The user receives a booking confirmation email
- Also, the check-in module listens to the `BookingConfirmed` event and creates a check-in reminder record to be sent to the passenger 3 days before the flight
- The user is redirected to the booking details page

## Booking completed

- The user sees the booking details
