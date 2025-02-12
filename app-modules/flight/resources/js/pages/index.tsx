import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BaseLayout from "@/layouts/base-layout";
import { cn } from "@/lib/utils";
import { PageProps } from "@/types";
import { Airport } from "@flight/index";
import { Head, useForm } from "@inertiajs/react";
import { addDays, format } from "date-fns";
import { ArrowRight, CalendarIcon, ChevronDown, CreditCard, Headphones, Plane } from "lucide-react";

export default function Index({
  airports,
}: PageProps<{
  airports: Airport[];
}>) {
  const { data, setData, get, processing } = useForm({
    origin_airport_id: 1,
    destination_airport_id: 3,
    departure_date: format(addDays(new Date(), 1), "yyyy-MM-dd"),
    passengers: 1,
  });

  const submit = () => {
    get("/flights/search", {
      data,
    });
  };

  const cities = new Map<number, [string, string]>([
    [1, ["Paris", "https://images.unsplash.com/photo-1431274172761-fca41d930114?q=80&w=600&auto=format&fit=crop"]],
    [3, ["Tokyo", "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=600&auto=format&fit=crop"]],
    [6, ["Sydney", "https://images.unsplash.com/photo-1549180030-48bf079fb38a?q=80&w=600&auto=format&fit=crop"]],
    [2, ["New York", "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=600&auto=format&fit=crop"]],
    [4, ["London", "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?q=80&w=600&auto=format&fit=crop"]],
    [5, ["Rome", "https://images.unsplash.com/photo-1531572753322-ad063cecc140?q=80&w=600&auto=format&fit=crop"]],
  ]);

  return (
    <BaseLayout>
      <Head title="Home" />

      <section className="container mx-auto">
        <div className="relative mx-auto flex items-stretch justify-between gap-16 overflow-hidden rounded-xl bg-[url('https://images.unsplash.com/photo-1618032593076-64793c24427d?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center p-8 pl-16">
          {/* Content */}
          <div className="relative z-10 w-6/12 py-32 text-white">
            <h1 className="text-8xl font-bold">Explore the unexplored</h1>
            <h3 className="mt-4 text-balance text-4xl font-bold">Limited Time Offers to Australia and Japan.</h3>
            <Button className="mt-8" variant={"secondary"} size={"lg"}>
              View all deals <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="absolute bottom-4 left-0 text-sm text-white/60">
              * Sale ends 11.59pm (AEDT) 10 February 2025, unless sold out prior. Selected routes, travel dates and conditions apply. Prices based on
              payment at qantas.com by BPAY or PayID. Some flights are subject to government and regulatory approval.
            </p>
          </div>
          {/* Form */}
          <div className="relative z-10 w-5/12">
            <div className="h-full rounded-xl bg-white p-10 shadow-2xl">
              <h1 className="mb-6 text-3xl font-bold text-gray-800">Find Your Perfect Flight</h1>
              <form className="space-y-4">
                {/* From */}
                <div className="relative">
                  <Label htmlFor="from" className="mb-1 block text-gray-500">
                    From
                  </Label>
                  <Select value={data.origin_airport_id.toString()} onValueChange={(value) => setData("origin_airport_id", parseInt(value))}>
                    <SelectTrigger id="from">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {airports.map((airport) => (
                        <SelectItem key={airport.id} value={airport.id.toString()}>
                          {airport.city}, {airport.country} ({airport.iata_code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* To */}
                <div className="relative">
                  <Label htmlFor="to" className="mb-1 block text-gray-500">
                    To
                  </Label>
                  <Select
                    value={data.destination_airport_id.toString()}
                    onValueChange={(value) => setData("destination_airport_id", parseInt(value))}
                  >
                    <SelectTrigger id="to">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {airports.map((airport) => (
                        <SelectItem key={airport.id} value={airport.id.toString()}>
                          {airport.city}, {airport.country} ({airport.iata_code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* When */}
                <div className="relative">
                  <Label htmlFor="depart-date" className="mb-1 block text-gray-500">
                    When
                  </Label>
                  <div className="relative">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn("w-full justify-start text-left font-normal", !data.departure_date && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {data.departure_date ? format(data.departure_date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="single"
                          selected={data.departure_date ? new Date(data.departure_date) : undefined}
                          onSelect={(date) => setData("departure_date", date ? format(date, "yyyy-MM-dd") : "")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Passengers */}
                <div>
                  <Label htmlFor="passengers" className="mb-1 block text-gray-500">
                    Passengers
                  </Label>
                  <Select value={data.passengers.toString()} onValueChange={(value) => setData("passengers", parseInt(value))}>
                    <SelectTrigger id="passengers">
                      <SelectValue placeholder="1 Adult" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Adult</SelectItem>
                      <SelectItem value="2">2 Adults</SelectItem>
                      <SelectItem value="3">3 Adults</SelectItem>
                      <SelectItem value="4">4 Adults</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end">
                  <Button className="w-32" onClick={submit} disabled={processing}>
                    SEARCH
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black opacity-50"></div>
        </div>
      </section>

      <section className="hidden bg-gray-100 py-16">
        <div className="container mx-auto">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">Why Choose Artisan Airlines?</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card>
              <CardContent className="flex flex-col items-center p-6">
                <CreditCard className="mb-4 h-12 w-12 text-blue-600" />
                <h3 className="mb-2 text-xl font-semibold">Best Price Guarantee</h3>
                <p className="text-center text-gray-600">We offer competitive prices on our 100 million plus product range.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center p-6">
                <Headphones className="mb-4 h-12 w-12 text-blue-600" />
                <h3 className="mb-2 text-xl font-semibold">24/7 Support</h3>
                <p className="text-center text-gray-600">Round the clock assistance for a smooth booking experience.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center p-6">
                <Plane className="mb-4 h-12 w-12 text-blue-600" />
                <h3 className="mb-2 text-xl font-semibold">Flexible Booking</h3>
                <p className="text-center text-gray-600">Change or cancel your booking with no additional fees.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container relative mx-auto">
          <h2 className="mb-8 text-3xl font-bold text-gray-800">
            Flight specials from{" "}
            <div className="inline-flex items-center gap-2 text-blue-600">
              Tokyo <ChevronDown className="size-6" />
            </div>
          </h2>
          <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from(cities.entries()).map(([id, [city, image]]) => (
              <div key={id} className="group relative h-64 overflow-hidden rounded-lg">
                <img
                  src={image}
                  alt={city}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                  <h3 className="text-2xl font-bold text-white">{city}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Map */}
          <img src="/images/map.svg" alt="Map" className="absolute -right-24 top-0 -z-10 h-64 w-7/12 -translate-y-1/3 rounded-lg object-cover" />
        </div>
      </section>
    </BaseLayout>
  );
}
