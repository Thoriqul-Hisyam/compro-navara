"use client";

import Link from "next/link";
import { ArrowRight, Car, Building2, Bus } from "lucide-react";

const services = [
  {
    icon: Car,
    title: "Personal Rental",
    subtitle: "Solusi Perjalanan Pribadi",
    description:
      "Layanan sewa mobil harian dengan berbagai pilihan armada terbaru untuk kebutuhan pribadi dan keluarga Anda.",
    tag: "Daily",
  },
  {
    icon: Building2,
    title: "Corporate Rental",
    subtitle: "Transportasi Bisnis Terintegrasi",
    description:
      "Layanan sewa kendaraan jangka panjang untuk operasional perusahaan dengan manajemen armada yang profesional.",
    tag: "Business",
  },
  {
    icon: Bus,
    title: "Bus Rental",
    subtitle: "Perjalanan Grup Lebih Nyaman",
    description:
      "Sewa bus pariwisata dengan kapasitas beragam, mulai dari medium hingga big bus untuk perjalanan grup.",
    tag: "Premium",
  },
];

const ServicesSection = () => {
  return (
    <section id="destinations" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Layanan Kami
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Solusi <span className="text-gradient-earth">Transportasi</span> Menyeluruh
          </h2>
          <p className="text-lg text-muted-foreground">
            Navara hadir dengan berbagai pilihan layanan transportasi yang dapat 
            disesuaikan dengan segala kebutuhan perjalanan Anda.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="group bg-card rounded-2xl p-8 shadow-soft hover:shadow-large transition-all duration-500 hover:-translate-y-2 border border-border/50"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <service.icon className="w-8 h-8" />
              </div>

              <div className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold mb-4">
                {service.tag}
              </div>

              <h3 className="font-serif text-2xl font-bold text-card-foreground mb-2">
                {service.title}
              </h3>

              <p className="text-sm text-primary font-medium mb-4">
                {service.subtitle}
              </p>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>

              <Link
                href="#contact"
                className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
              >
                Selengkapnya
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
