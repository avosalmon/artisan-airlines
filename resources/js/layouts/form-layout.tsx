import { Link } from "@inertiajs/react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function FormLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden">
      <nav className="p-8 pb-0 flex items-center justify-between gap-4">
        {/* Logo and Back Button */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center space-x-2">
            <Logo className="h-8 w-fit" />
          </Link>
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Login
          </Button>
          <Button size="sm">
            Sign Up
          </Button>
        </div>
      </nav>

      {/* Content */}
      <div className="container px-4 py-8 max-w-screen-md grow h-full flex flex-col justify-center mx-auto">{children}</div>

      {/* Map */}
      <img src="/images/map.svg" alt="Map" className="absolute opacity-50 left-1/2 -translate-x-1/2 top-0 -z-10 w-full object-cover" />
    </main>
  );
}
