"use client";

import Link from "next/link";
import { Bus, Instagram, Phone, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background text-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="#home" className="flex items-center gap-2 mb-4">
              <Bus className="w-8 h-8 text-secondary" />
              <span className="font-serif text-2xl font-bold">Navara Trip</span>
            </Link>

            <p className="text-foreground/70 max-w-md mb-6">
              Penyedia layanan perjalanan wisata premium dengan armada mewah ke
              berbagai destinasi eksotis di Indonesia. Pengalaman tak terlupakan
              dengan pelayanan terbaik.
            </p>

            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/navara_trip/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href="https://wa.me/6281234567890"
                className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors"
              >
                <Phone className="w-5 h-5" />
              </a>

              <a
                href="mailto:hello@navaratrip.com"
                className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#about"
                  className="text-foreground/70 hover:text-secondary transition-colors"
                >
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link
                  href="#destinations"
                  className="text-foreground/70 hover:text-secondary transition-colors"
                >
                  Destinasi
                </Link>
              </li>
              <li>
                <Link
                  href="#packages"
                  className="text-foreground/70 hover:text-secondary transition-colors"
                >
                  Paket Trip
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-foreground/70 hover:text-secondary transition-colors"
                >
                  Hubungi Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Destinasi</h4>
            <ul className="space-y-3">
              {["Labuan Bajo", "Sumba", "Raja Ampat", "Bromo"].map((item) => (
                <li key={item}>
                  <Link
                    href="#destinations"
                    className="text-foreground/70 hover:text-secondary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-foreground/50">
            © {currentYear} Navara Trip. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-foreground/50">
            <Link href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
