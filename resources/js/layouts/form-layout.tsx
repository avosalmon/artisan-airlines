import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";

export default function FormLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden">
      <nav className="fixed flex w-full items-center justify-between gap-4 p-8 pb-0">
        {/* Logo and Back Button */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center space-x-2">
            <Logo className="h-8 w-fit" />
          </Link>
          <Button variant="outline" size="sm" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Login
          </Button>
          <Button size="sm">Sign Up</Button>
        </div>
      </nav>

      {/* Content */}
      <div className="container mx-auto flex h-full max-w-screen-md grow flex-col justify-center px-4 py-8">{children}</div>

      {/* Map */}
      <img src="/images/map.svg" alt="Map" className="fixed left-1/2 top-0 -z-10 w-full -translate-x-1/2 object-cover opacity-50" />
    </main>
  );
}
