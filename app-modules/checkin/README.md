This document describes the process of checking in for a flight.

## Check in

- The user receives a check in reminder email 3 days before the flight (scheduled task)
- The user clicks the "check in" button in the email
- The user is redirected to the check in page

## Check in page

- The user sees the check in page
- The user provides the booking details
- The user clicks the "check in" button
- The check in is processed and the user can download the boarding pass
- The `BookingCheckedIn` event is dispatched and the booking module updates the status of the passenger to `checked_in`
