"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background text-foreground py-16 border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 mb-12 items-center text-center md:text-left">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="#home" className="flex items-center justify-center md:justify-start gap-2 mb-6">
              <Image
                src="/logo.png"
                alt="Navara Logo"
                width={720}
                height={720}
                className="h-24 w-auto"
              />
            </Link>

            <p className="text-foreground/70 max-w-md mx-auto md:mx-0 mb-8 leading-relaxed">
              Navara menghadirkan solusi transportasi terintegrasi yang mengutamakan 
              keamanan dan kenyamanan. Menjadi partner terpercaya Anda dalam setiap 
              kilometer perjalanan.
            </p>
          </div>

          <div className="md:col-span-1 flex flex-col items-center md:items-end">
            <div className="space-y-4 mb-8 text-center md:text-right">
              <div className="flex items-start md:justify-end gap-3 text-sm text-foreground/70">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>Jl. Raya Transportasi No. 123, Jakarta Selatan, Indonesia</span>
              </div>
              <div className="flex items-center md:justify-end gap-3 text-sm text-foreground/70">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>Call Center: 1500 009</span>
              </div>
            </div>

            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-foreground/50">
            © {currentYear} Navara. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-foreground/50">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
