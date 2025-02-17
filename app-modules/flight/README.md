This document describes the process of searching for a flight.

## Search for a flight

- The user navigates to the flight search page
- The user selects the departure and arrival airports
- The user selects the departure and arrival dates
- The user selects the number of passengers
- The user clicks the search button
- The user is redirected to the flight search results page

## Flight search results

- The user sees a list of flights
- The user can select a flight to view the flight details
- The user clicks the "proceed" button
- The user is redirected to the flight booking page under the booking module

## Database tables

1. airports: Stores information about airports including their IATA codes (e.g., LAX for Los Angeles International Airport), name, city, and timezone.
2. aircraft_types: Contains information about different types of aircraft, including their seating capacity.
3. flights: The main table for flight schedules, containing:
   - Flight number
   - Origin and destination airports (foreign keys to airports table)
   - Aircraft type
   - Departure and arrival times
   - Base price
   - Flight status
   - Available seats
