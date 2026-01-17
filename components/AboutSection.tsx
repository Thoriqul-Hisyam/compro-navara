"use client";

import Image from "next/image";
import { Bus, Shield, Car, Users, Star } from "lucide-react";
import boatCabinImage from "@/assets/boat-cabin.jpg";

const features = [
  {
    icon: Car,
    title: "Rental Mobil & Bus",
    description:
      "Pilihan armada lengkap dari mobil keluarga hingga bus pariwisata untuk berbagai kebutuhan",
  },
  {
    icon: Users,
    title: "Layanan Pengemudi",
    description:
      "Driver profesional dan berpengalaman yang siap memberikan rasa aman selama perjalanan",
  },
  {
    icon: Shield,
    title: "Proteksi Menyeluruh",
    description:
      "Setiap armada dilengkapi asuransi dan melalui pengecekan rutin standar keamanan",
  },
  {
    icon: Bus,
    title: "Jaringan Luas",
    description:
      "Akses layanan mudah dengan jaringan operasional di berbagai kota besar di Indonesia",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-large">
              <Image
                src={boatCabinImage}
                alt="Premium armada interior"
                className="w-full aspect-square object-cover"
                priority={false}
              />
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -right-6 md:-right-12 bg-card p-6 rounded-xl shadow-large max-w-xs">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-brand flex items-center justify-center">
                  <Star className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <div className="font-serif text-xl font-bold text-card-foreground">
                    Solusi Total
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Transportasi
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Layanan terintegrasi mulai dari sewa harian hingga korporat
              </p>
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Tentang Kami
            </div>

            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Pilihan Utama Solusi{" "}
              <span className="text-gradient-earth">Transportasi Anda</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8">
              Navara adalah penyedia layanan transportasi terintegrasi yang menghadirkan 
              kenyamanan dan keamanan bagi mobilitas Anda. Sebagai partner perjalanan terpercaya, 
              kami berkomitmen menyediakan armada berkualitas tinggi dan pelayanan prima untuk 
              kebutuhan personal maupun bisnis.
            </p>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-4 rounded-lg hover:bg-primary/3 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex  items-center justify-center shrink-0">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
