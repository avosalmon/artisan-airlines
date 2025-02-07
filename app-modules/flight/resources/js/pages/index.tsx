import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BaseLayout from "@/layouts/base-layout";
import { Head, useForm } from "@inertiajs/react";
import { Calendar, CreditCard, Headphones, Plane } from "lucide-react";
import { Airport } from "@flight/index";
import { PageProps } from "@/types";
import { addDays, format } from "date-fns";

export default function Index({ airports }: PageProps<{
  airports: Airport[];
}>) {
  const { data, setData, get, processing } = useForm({
    origin_airport_id: "",
    destination_airport_id: "",
    departure_date: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
    passengers: 1,
  });

  const submit = () => {
    get("/flights/search", {
      data,
    });
  };

  return (
    <BaseLayout>
      <Head title="Home" />

      <section className="relative h-[500px]">
        {/* <img
          src="/images/hero-background.jpg"
          alt="Airplane flying over a beautiful landscape"
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        /> */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg">
            <h1 className="mb-6 text-3xl font-bold text-gray-800">Find Your Perfect Flight</h1>
            <form className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="relative">
                  <Label htmlFor="from" className="mb-1 block text-gray-500">
                    FROM
                  </Label>
                  <Select value={data.origin_airport_id} onValueChange={(value) => setData('origin_airport_id', value)}>
                    <SelectTrigger id="from">
                      <SelectValue placeholder="Select a city" />
                    </SelectTrigger>
                    <SelectContent>
                      {
                        airports.map((airport) => (
                          <SelectItem key={airport.id} value={airport.id.toString()}>
                            {airport.city}, {airport.country} ({airport.iata_code})
                          </SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                </div>
                <div className="relative">
                  <Label htmlFor="to" className="mb-1 block text-gray-500">
                    TO
                  </Label>
                  <Select value={data.destination_airport_id} onValueChange={(value) => setData('destination_airport_id', value)}>
                    <SelectTrigger id="to">
                      <SelectValue placeholder="Select a city" />
                    </SelectTrigger>
                    <SelectContent>
                      {
                        airports.map((airport) => (
                          <SelectItem key={airport.id} value={airport.id.toString()}>
                            {airport.city}, {airport.country} ({airport.iata_code})
                          </SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="relative">
                  <Label htmlFor="depart-date" className="mb-1 block text-gray-500">
                    DEPART DATE
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
                    <Input id="depart-date" type="date" className="pr-10" value={data.departure_date} onChange={(e) => setData('departure_date', e.target.value)} />
                  </div>
                </div>
                <div className="relative">
                  <Label htmlFor="return-date" className="mb-1 block text-gray-500">
                    RETURN DATE
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
                    <Input id="return-date" type="date" className="pr-10" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="class" className="mb-1 block text-gray-500">
                    CLASS
                  </Label>
                  <Select>
                    <SelectTrigger id="class">
                      <SelectValue placeholder="Economy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="economy">Economy</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="first">First Class</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="passengers" className="mb-1 block text-gray-500">
                    PASSENGERS
                  </Label>
                  <Select value={data.passengers.toString()} onValueChange={(value) => setData('passengers', parseInt(value))}>
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
              </div>

              <div className="flex justify-end">
                <Button className="w-32" onClick={submit} disabled={processing}>SEARCH</Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
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
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">Popular Destinations</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {["Paris", "New York", "Tokyo", "London", "Rome", "Sydney"].map((city) => (
              <div key={city} className="group relative h-64 overflow-hidden rounded-lg">
                {/* <img
                  src={`/images/destinations/${city.toLowerCase()}.jpg`}
                  alt={`${city} cityscape`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                /> */}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                  <h3 className="text-2xl font-bold text-white">{city}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
