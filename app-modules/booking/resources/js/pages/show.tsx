import FormLayout from "@/layouts/form-layout";
import { PageProps } from "@/types";
import { Booking } from "@booking/index";
import { Flight } from "@flight/index";
import { Head } from "@inertiajs/react";

export default function Show({ booking, flight }: PageProps<{ booking: Booking; flight: Flight }>) {
  return (
    <FormLayout>
      <Head title="Payment" />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Booking Confirmed</h1>
      </div>
    </FormLayout>
  );
}
