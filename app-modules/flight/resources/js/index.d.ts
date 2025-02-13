export interface Airport {
  id: number;
  iata_code: string;
  name: string;
  city: string;
  country: string;
  timezone: string;
}

export interface AircraftType {
  id: number;
  code: string;
  name: string;
  total_seats: number;
}

export interface Flight {
  id: number;
  flight_number: string;
  departure_time: string;
  arrival_time: string;
  status: "scheduled" | "cancelled" | "delayed" | "in_progress" | "completed";
  base_price: number;
  origin_airport?: Airport;
  destination_airport?: Airport;
  aircraft_type?: AircraftType;
  fare_classes?: FlightFareClass[];
}

export interface FlightFareClass {
  id: number;
  flight_id: number;
  fare_class: "economy" | "business" | "first";
  price: number;
  seats?: Seat[];
}

export interface Seat {
  id: number;
  flight_fare_class_id: number;
  seat_number: string;
  is_available: boolean;
}
