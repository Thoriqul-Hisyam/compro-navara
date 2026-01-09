"use client";

import Image from "next/image";
import { Bus, Shield, Camera, Utensils } from "lucide-react";
import boatCabinImage from "@/assets/boat-cabin.jpg";

const features = [
  {
    icon: Bus,
    title: "Armada Premium",
    description:
      "Perjalanan nyaman dengan armada mewah ber-AC, kursi reclining, dan fasilitas hiburan",
  },
  {
    icon: Shield,
    title: "Keamanan Terjamin",
    description:
      "Driver berpengalaman, asuransi perjalanan, dan standar keselamatan tinggi",
  },
  {
    icon: Camera,
    title: "Dokumentasi Premium",
    description:
      "Dapatkan foto & video dengan Drone, GoPro, dan kamera profesional",
  },
  {
    icon: Utensils,
    title: "Kuliner Istimewa",
    description:
      "Nikmati hidangan lezat di restoran lokal terbaik selama perjalanan",
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
                  <Bus className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <div className="font-serif text-xl font-bold text-card-foreground">
                    7+ Tahun
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Pengalaman
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Melayani wisatawan dari seluruh Indonesia dan mancanegara
              </p>
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Tentang Kami
            </div>

            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Pengalaman Perjalanan{" "}
              <span className="text-gradient-earth">Tak Terlupakan</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8">
              Navara Trip adalah penyedia layanan perjalanan wisata premium yang
              mengkhususkan diri pada pengalaman tour dengan armada mewah ke
              berbagai destinasi eksotis di Indonesia. Kami menawarkan Open Trip
              dan Private Trip dengan pelayanan terbaik.
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
