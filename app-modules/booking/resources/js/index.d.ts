export interface Booking {
  id: number;
  booking_reference: string;
  flight_fare_class_id: number;
  contact_email: string | null;
  contact_phone: string | null;
  status: "pending" | "confirmed" | "cancelled";
  passenger_count: number;
  total_amount: number;
  passengers: Passenger[];
}

export interface Passenger {
  id: number;
  booking_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  gender: "male" | "female" | "other";
  nationality: string;
  passport_number: string;
}
