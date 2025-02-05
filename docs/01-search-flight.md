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
4. flight_prices: Handles dynamic pricing for different fare classes (economy, business, first) for each flight.

```sql
-- Airports table to store airport information
CREATE TABLE airports (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    iata_code CHAR(3) NOT NULL UNIQUE, -- Airport code (e.g., LAX, JFK)
    name VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    timezone VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);

-- Aircraft types table
CREATE TABLE aircraft_types (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(10) NOT NULL, -- e.g., B737, A320
    name VARCHAR(255) NOT NULL,
    total_seats INT NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);

-- Flights table to store flight schedules
CREATE TABLE flights (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    flight_number VARCHAR(10) NOT NULL,
    origin_airport_id BIGINT UNSIGNED NOT NULL,
    destination_airport_id BIGINT UNSIGNED NOT NULL,
    aircraft_type_id BIGINT UNSIGNED NOT NULL,
    departure_time DATETIME NOT NULL,
    arrival_time DATETIME NOT NULL,
    base_price DECIMAL(10, 2) NOT NULL,
    status ENUM('scheduled', 'delayed', 'cancelled', 'completed') DEFAULT 'scheduled',
    available_seats INT NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (origin_airport_id) REFERENCES airports(id),
    FOREIGN KEY (destination_airport_id) REFERENCES airports(id),
    FOREIGN KEY (aircraft_type_id) REFERENCES aircraft_types(id)
);

-- Flight prices table for dynamic pricing
CREATE TABLE flight_prices (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    flight_id BIGINT UNSIGNED NOT NULL,
    fare_class ENUM('economy', 'business', 'first') NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    available_seats INT NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (flight_id) REFERENCES flights(id)
);
```
