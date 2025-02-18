import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FormLayout from "@/layouts/form-layout";
import { PageProps } from "@/types";
import { Booking } from "@booking/index";
import { FlightCard } from "@flight/components/flight-card";
import { Flight } from "@flight/index";
import { Head, useForm } from "@inertiajs/react";
import { CheckCircle2 } from "lucide-react";

interface PassengerForm {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  gender: string;
  nationality: string;
  passport_number: string;
}

export default function Create({ booking, flight }: PageProps<{ booking: Booking; flight: Flight }>) {
  const { data, setData, post, processing, errors } = useForm<{ passengers: PassengerForm[] }>({
    passengers: Array(booking.passenger_count).fill({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      date_of_birth: "",
      gender: "",
      nationality: "",
      passport_number: "",
    }),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("booking.passenger.store", { booking: booking.id }));
  };

  const updatePassenger = (index: number, field: keyof PassengerForm, value: string) => {
    const newPassengers = [...data.passengers];
    newPassengers[index] = { ...newPassengers[index], [field]: value };
    setData("passengers", newPassengers);
  };

  const isPassengerComplete = (passenger: PassengerForm) => {
    return Object.values(passenger).every((value) => value !== "");
  };

  return (
    <FormLayout>
      <Head title="Passenger Details" />
      <div className="container mx-auto px-4 py-8">
        <FlightCard flight={flight} passengers={booking.passenger_count} onSelectFlight={() => {}} showBookNow={false} className="motion-preset-blur-up" />
      

      <div className="py-8 motion-preset-blur-up">
        <div className="mx-auto">
          <h2 className="mb-6 text-2xl font-bold">Passenger Information</h2>

          <form onSubmit={handleSubmit} className="space-y-6 p-6 border rounded-lg bg-white">
            <Accordion type="single" collapsible defaultValue="passenger-0">
              {data.passengers.map((passenger, index) => (
                <AccordionItem key={index} value={`passenger-${index}`}>
                  <AccordionTrigger className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <span>Passenger {index + 1}</span>
                      {isPassengerComplete(passenger) && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-6 pt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`first_name-${index}`}>First Name</Label>
                          <Input
                            id={`first_name-${index}`}
                            value={passenger.first_name}
                            onChange={(e) => updatePassenger(index, "first_name", e.target.value)}
                            required
                          />
                          {errors[`passengers.${index}.first_name`] && (
                            <p className="text-sm text-red-500">{errors[`passengers.${index}.first_name`]}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`last_name-${index}`}>Last Name</Label>
                          <Input
                            id={`last_name-${index}`}
                            value={passenger.last_name}
                            onChange={(e) => updatePassenger(index, "last_name", e.target.value)}
                            required
                          />
                          {errors[`passengers.${index}.last_name`] && (
                            <p className="text-sm text-red-500">{errors[`passengers.${index}.last_name`]}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`email-${index}`}>Email</Label>
                        <Input
                          id={`email-${index}`}
                          type="email"
                          value={passenger.email}
                          onChange={(e) => updatePassenger(index, "email", e.target.value)}
                          required
                        />
                        {errors[`passengers.${index}.email`] && <p className="text-sm text-red-500">{errors[`passengers.${index}.email`]}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`phone-${index}`}>Phone Number</Label>
                        <Input
                          id={`phone-${index}`}
                          type="tel"
                          value={passenger.phone}
                          onChange={(e) => updatePassenger(index, "phone", e.target.value)}
                          required
                        />
                        {errors[`passengers.${index}.phone`] && <p className="text-sm text-red-500">{errors[`passengers.${index}.phone`]}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`date_of_birth-${index}`}>Date of Birth</Label>
                        <Input
                          id={`date_of_birth-${index}`}
                          type="text"
                          placeholder="DD/MM/YYYY"
                          value={passenger.date_of_birth}
                          onChange={(e) => updatePassenger(index, "date_of_birth", e.target.value)}
                          required
                        />
                        {errors[`passengers.${index}.date_of_birth`] && (
                          <p className="text-sm text-red-500">{errors[`passengers.${index}.date_of_birth`]}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>Gender</Label>
                        <Select value={passenger.gender} onValueChange={(value) => updatePassenger(index, "gender", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors[`passengers.${index}.gender`] && <p className="text-sm text-red-500">{errors[`passengers.${index}.gender`]}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`nationality-${index}`}>Nationality</Label>
                        <Input
                          id={`nationality-${index}`}
                          value={passenger.nationality}
                          onChange={(e) => updatePassenger(index, "nationality", e.target.value)}
                          required
                        />
                        {errors[`passengers.${index}.nationality`] && (
                          <p className="text-sm text-red-500">{errors[`passengers.${index}.nationality`]}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`passport_number-${index}`}>Passport Number</Label>
                        <Input
                          id={`passport_number-${index}`}
                          value={passenger.passport_number}
                          onChange={(e) => updatePassenger(index, "passport_number", e.target.value)}
                          required
                        />
                        {errors[`passengers.${index}.passport_number`] && (
                          <p className="text-sm text-red-500">{errors[`passengers.${index}.passport_number`]}</p>
                        )}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <Button type="submit" size="lg" className="w-full" disabled={processing}>
              Proceed to Seat Selection
            </Button>
          </form>
          </div>
        </div>
      </div>
    </FormLayout>
  );
}
