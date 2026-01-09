"use client";

import { Button } from "@/components/ui/button";
import { Check, Users, Clock, Bus } from "lucide-react";

const packages = [
  {
    name: "Open Trip",
    subtitle: "Bergabung dengan Traveler Lain",
    price: "1.5",
    priceNote: "juta / orang",
    duration: "3D2N",
    capacity: "Max 40 orang",
    features: [
      "Armada mewah ber-AC",
      "Hotel bintang 3",
      "Makan 3x sehari",
      "Dokumentasi dengan Drone & GoPro",
      "Tour guide berpengalaman",
      "Tiket masuk wisata",
    ],
    popular: false,
  },
  {
    name: "Private Trip",
    subtitle: "Eksklusif untuk Grup Anda",
    price: "25",
    priceNote: "juta / armada",
    duration: "3D2N",
    capacity: "Max 40 orang",
    features: [
      "Semua fasilitas Open Trip",
      "Kebebasan memilih tanggal",
      "Kustomisasi itinerary",
      "Armada eksklusif untuk grup",
      "Layanan premium",
      "Dokumentasi profesional",
    ],
    popular: true,
  },
  {
    name: "VIP Private",
    subtitle: "Pengalaman Premium Ultimate",
    price: "45",
    priceNote: "juta / armada",
    duration: "4D3N",
    capacity: "Max 25 orang",
    features: [
      "Semua fasilitas Private Trip",
      "Armada VIP premium seat",
      "Hotel bintang 4/5",
      "Personal photographer",
      "Dinner eksklusif",
      "Welcome gift & souvenir",
    ],
    popular: false,
  },
];

const PackagesSection = () => {
  return (
    <section id="packages" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Paket Trip
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Pilih Paket <span className="text-gradient-earth">Perjalanan</span>{" "}
            Anda
          </h2>
          <p className="text-lg text-muted-foreground">
            Berbagai pilihan paket perjalanan yang dapat disesuaikan dengan
            kebutuhan dan budget Anda
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`relative bg-card rounded-2xl p-8 shadow-soft hover:shadow-large transition-all duration-300 ${
                pkg.popular
                  ? "ring-2 ring-primary lg:scale-105"
                  : "hover:-translate-y-1"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full bg-gradient-brand text-primary-foreground text-sm font-semibold">
                    Paling Populer
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="font-serif text-2xl font-bold text-card-foreground mb-1">
                  {pkg.name}
                </h3>
                <p className="text-sm text-muted-foreground">{pkg.subtitle}</p>
              </div>

              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-sm text-muted-foreground">Rp</span>
                  <span className="font-serif text-5xl font-bold text-card-foreground">
                    {pkg.price}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {pkg.priceNote}
                </p>
              </div>

              <div className="flex items-center justify-center gap-6 mb-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {pkg.duration}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {pkg.capacity}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                variant={pkg.popular ? "hero" : "outline"}
                size="lg"
                className="w-full"
              >
                <Bus className="w-4 h-4" />
                Pesan Sekarang
              </Button>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-sm text-muted-foreground mt-12 max-w-2xl mx-auto">
          * Harga dapat berubah sewaktu-waktu. Hubungi kami untuk penawaran
          khusus dan promo musiman.
        </p>
      </div>
    </section>
  );
};

export default PackagesSection;
