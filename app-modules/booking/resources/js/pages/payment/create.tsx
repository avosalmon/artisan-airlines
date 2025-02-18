import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormLayout from "@/layouts/form-layout";
import { PageProps } from "@/types";
import { Booking } from "@booking/index";
import { FlightCard } from "@flight/components/flight-card";
import { Flight } from "@flight/index";
import { Head, router } from "@inertiajs/react";
import { CreditCard } from "lucide-react";
import { useState } from "react";

export default function Create({ booking, flight }: PageProps<{ booking: Booking; flight: Flight }>) {
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
    address: "",
    city: "",
    country: "",
    zipCode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    const token = btoa(JSON.stringify(formData));
    router.post(route("booking.payment.store", { booking: booking.id }), { token });
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
                      <Input name="cardNumber" placeholder="1234 5678 9012 3456" value={formData.cardNumber} onChange={handleChange} required />
                      <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Expiry Date</Label>
                      <Input name="expiryDate" placeholder="MM/YY" value={formData.expiryDate} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label>CVV</Label>
                      <Input name="cvv" placeholder="123" value={formData.cvv} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Cardholder Name</Label>
                    <Input name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Billing Address</Label>
                    <Input name="address" placeholder="123 Main St" value={formData.address} onChange={handleChange} required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>City</Label>
                      <Input name="city" placeholder="New York" value={formData.city} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label>Country</Label>
                      <Input name="country" placeholder="United States" value={formData.country} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Zip Code</Label>
                    <Input name="zipCode" placeholder="12345" value={formData.zipCode} onChange={handleChange} required />
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
