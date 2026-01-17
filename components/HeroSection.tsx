"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Play, ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-bus.jpg";
import { useRouter } from "next/navigation";
import Link from "next/link";

const HeroSection = () => {
  const router = useRouter();
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Luxury tour armada on scenic mountain road"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-primary/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-6 sm:mb-8 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-orange-700 animate-pulse" />
            <span className="text-xs sm:text-sm font-medium text-primary-foreground">
              Solusi Transportasi Terpercaya
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary-foreground mb-4 sm:mb-6 animate-fade-in-up animation-delay-100">
            Navara Rental,
            <span className="block text-secondary">Teman di Setiap Kilometer</span>
          </h1>

          {/* Subheadline */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-primary-foreground/80 max-w-xl sm:max-w-2xl mx-auto mb-8 sm:mb-10 animate-fade-in-up animation-delay-200">
            Kemanapun tujuannya, berpergian lebih aman dan nyaman bersama Navara. 
            Layanan sewa mobil dan bus dengan standar pelayanan terbaik.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto flex-wrap animate-fade-in-up animation-delay-300">
            <Button className="w-full sm:w-auto" variant="hero" size="xl" onClick={() => router.push("/booking")}>
              Pesan Sekarang
            </Button>

            <Link href="#destinations" className="w-full sm:w-auto">
              <Button
                className="w-full"
                variant="heroOutline"
                size="xl"
              >
                Lihat Layanan
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-lg mx-auto mt-10 sm:mt-16 animate-fade-in-up animation-delay-400">
            {[
              { value: "1000+", label: "Armada Tersedia" },
              { value: "24/7", label: "Layanan Bantuan" },
              { value: "50+", label: "Kota Jangkauan" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground">
                  {item.value}
                </div>
                <div className="text-xs sm:text-sm text-primary-foreground/60">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#about"
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 text-primary-foreground/60 hover:text-primary-foreground transition-colors animate-float"
      >
        <ChevronDown className="w-6 sm:w-8 h-6 sm:h-8" />
      </a>
    </section>
  );
};

export default HeroSection;
