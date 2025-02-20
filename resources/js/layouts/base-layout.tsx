import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { Mail, Phone } from "lucide-react";

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <nav className="bg-white py-2">
        <div className="container mx-auto flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Logo className="h-8 w-fit" />
            <span className="text-xl font-bold text-gray-800">Artisan Airlines</span>
          </Link>

          {/* Links */}
          <div className="flex items-center gap-4 font-bold text-lg ml-6">
            <Link href="/">Home</Link>
            <Link href="/flights">Flights</Link>
            <Link href="/destinations">Destinations</Link>
          </div>
        </div>

          {/* Actions */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-4">
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">Login</Button>
              <Button>Sign Up</Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">{children}</main>

      <footer className="bg-gray-800 py-8 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <h4 className="mb-4 text-lg font-semibold">About Artisan Airlines</h4>
              <p className="text-gray-400">
                Artisan Airlines is your trusted partner for hassle-free air travel. We offer competitive prices and exceptional service.
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-lg font-semibold">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/flights" className="text-gray-400 hover:text-white">
                    Flights
                  </Link>
                </li>
                <li>
                  <Link href="/destinations" className="text-gray-400 hover:text-white">
                    Destinations
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-lg font-semibold">Contact Us</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Phone className="mr-2 h-5 w-5" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center">
                  <Mail className="mr-2 h-5 w-5" />
                  <span>support@artisan-airlines.com</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} Artisan Airlines. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
