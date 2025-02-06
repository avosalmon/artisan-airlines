import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BaseLayout from "@/layouts/base-layout";
import { Head } from "@inertiajs/react";
import { Calendar, CreditCard, Headphones, MapPin, Plane } from "lucide-react";

interface Airport {
  id: number;
  iata_code: string;
  name: string;
  city: string;
  country: string;
  label: string;
}

interface Props {
  airports: Airport[];
}

export default function Index({ airports }: Props) {
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
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Find Your Perfect Flight</h1>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Label htmlFor="from" className="block text-gray-500 mb-1">
                    FROM
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input id="from" placeholder="Enter city" className="pl-10" />
                  </div>
                </div>
                <div className="relative">
                  <Label htmlFor="to" className="block text-gray-500 mb-1">
                    TO
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input id="to" placeholder="Enter city" className="pl-10" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Label htmlFor="depart-date" className="block text-gray-500 mb-1">
                    DEPART DATE
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input id="depart-date" type="date" className="pr-10" />
                  </div>
                </div>
                <div className="relative">
                  <Label htmlFor="return-date" className="block text-gray-500 mb-1">
                    RETURN DATE
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input id="return-date" type="date" className="pr-10" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="class" className="block text-gray-500 mb-1">
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
                  <Label htmlFor="passengers" className="block text-gray-500 mb-1">
                    PASSENGERS
                  </Label>
                  <Select>
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
                <Button className="w-32">SEARCH</Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Why Choose Artisan Airlines?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="flex flex-col items-center p-6">
                <CreditCard className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Best Price Guarantee</h3>
                <p className="text-center text-gray-600">
                  We offer competitive prices on our 100 million plus product range.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center p-6">
                <Headphones className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                <p className="text-center text-gray-600">
                  Round the clock assistance for a smooth booking experience.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center p-6">
                <Plane className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Flexible Booking</h3>
                <p className="text-center text-gray-600">Change or cancel your booking with no additional fees.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Popular Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {["Paris", "New York", "Tokyo", "London", "Rome", "Sydney"].map((city) => (
              <div key={city} className="relative h-64 rounded-lg overflow-hidden group">
                {/* <img
                  src={`/images/destinations/${city.toLowerCase()}.jpg`}
                  alt={`${city} cityscape`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                /> */}
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">{city}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
