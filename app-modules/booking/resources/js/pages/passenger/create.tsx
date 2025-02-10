import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BaseLayout from "@/layouts/base-layout";
import { cn } from "@/lib/utils";
import { PageProps } from "@/types";
import { FlightHeader } from "@booking/components/flight-header";
import { Booking } from "@booking/index";
import { Flight } from "@flight/index";
import { Head, useForm } from "@inertiajs/react";
import { format } from "date-fns";
import { CalendarIcon, CheckCircle2 } from "lucide-react";

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
    post(route("booking.store"));
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
    <BaseLayout>
      <Head title="Passenger Details" />
      <FlightHeader flight={flight} booking={booking} />

      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-6 text-2xl font-bold">Passenger Information</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                        <Label>Date of Birth</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn("w-full justify-start text-left font-normal", !passenger.date_of_birth && "text-muted-foreground")}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {passenger.date_of_birth ? format(new Date(passenger.date_of_birth), "PPP") : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={passenger.date_of_birth ? new Date(passenger.date_of_birth) : undefined}
                              onSelect={(date) => updatePassenger(index, "date_of_birth", date ? format(date, "yyyy-MM-dd") : "")}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
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

            <Button type="submit" className="w-full" disabled={processing}>
              Proceed to Seat Selection
            </Button>
          </form>
        </div>
      </div>
    </BaseLayout>
  );
}
