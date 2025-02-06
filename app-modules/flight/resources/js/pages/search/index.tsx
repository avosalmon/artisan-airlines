import BaseLayout from "@/layouts/base-layout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Flight } from "@flight/index";

export default function Index({ flights }: PageProps<{
  flights: Flight[];
}>) {
  return (
    <BaseLayout>
      <Head title="Search Results" />


    </BaseLayout>
  );
}
