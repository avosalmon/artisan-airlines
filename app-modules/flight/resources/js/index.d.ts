export interface Airport {
  id: number;
  iata_code: string;
  name: string;
  city: string;
  country: string;
  label: string;
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
  available_seats: number;
  base_price: number;
  origin_airport?: Airport;
  destination_airport?: Airport;
  aircraft_type?: AircraftType;
  prices?: FlightPrice[];
}

export interface FlightPrice {
  id: number;
  flight_id: number;
  fare_class: "economy" | "business" | "first_class";
  price: number;
  available_seats: number;
}
