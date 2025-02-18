import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormLayout from "@/layouts/form-layout";
import { PageProps } from "@/types";
import { Booking } from "@booking/index";
import { FlightCard } from "@flight/components/flight-card";
import { Flight } from "@flight/index";
import { Head, useForm } from "@inertiajs/react";
import { CreditCard } from "lucide-react";

export default function Create({ booking, flight }: PageProps<{ booking: Booking; flight: Flight }>) {
  const { data, setData, post, processing } = useForm({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
    address: "",
    city: "",
    country: "",
    zipCode: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("booking.payment.store"));
  };

  return (
    <FormLayout>
      <Head title="Payment" />

      <div className="container mx-auto px-4 py-8">
        <FlightCard flight={flight} passengers={booking.passenger_count} />

        <div className="py-8">
          <div className="mx-auto">
            <h2 className="mb-6 text-2xl font-bold">Payment Details</h2>

            <Card>
              <CardContent className="p-6">
                <form onSubmit={submit} className="space-y-6">
                  <div className="space-y-2">
                    <Label>Card Number</Label>
                    <div className="relative">
                      <Input placeholder="1234 5678 9012 3456" value={data.cardNumber} onChange={(e) => setData("cardNumber", e.target.value)} />
                      <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Expiry Date</Label>
                      <Input placeholder="MM/YY" value={data.expiryDate} onChange={(e) => setData("expiryDate", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>CVV</Label>
                      <Input placeholder="123" value={data.cvv} onChange={(e) => setData("cvv", e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Cardholder Name</Label>
                    <Input placeholder="John Doe" value={data.name} onChange={(e) => setData("name", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Billing Address</Label>
                    <Input placeholder="123 Main St" value={data.address} onChange={(e) => setData("address", e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>City</Label>
                      <Input placeholder="New York" value={data.city} onChange={(e) => setData("city", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Country</Label>
                      <Input placeholder="United States" value={data.country} onChange={(e) => setData("country", e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Zip Code</Label>
                    <Input placeholder="12345" value={data.zipCode} onChange={(e) => setData("zipCode", e.target.value)} />
                  </div>
                  <Button type="submit" className="w-full" disabled={processing}>
                    {processing ? "Processing..." : `Pay $${booking.total_amount}`}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </FormLayout>
  );
}
