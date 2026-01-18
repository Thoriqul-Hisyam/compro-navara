"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Instagram, Phone, Mail, MapPin, Send } from "lucide-react";

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="py-20 md:py-32 bg-gradient-brand text-primary-foreground"
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info */}
          <div>
            <div className="inline-block px-4 py-1 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium mb-6">
              Hubungi Kami
            </div>

            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Siap Memulai
              <span className="block text-secondary">Petualangan?</span>
            </h2>

            <p className="text-lg text-primary-foreground/80 mb-10">
              Hubungi tim kami untuk konsultasi gratis dan dapatkan penawaran
              terbaik untuk perjalanan impian Anda
            </p>

            <div className="space-y-6">
              <a
                href="https://www.instagram.com/navara_trip/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Instagram className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold">Instagram</div>
                  <div className="text-sm text-primary-foreground/70">
                    @navara_trip
                  </div>
                </div>
              </a>

              <a
                href="https://wa.me/628113556799"
                className="flex items-center gap-4 p-4 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold">WhatsApp</div>
                  <div className="text-sm text-primary-foreground/70">
                    +62 811-3556-799
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-lg bg-primary-foreground/10">
                <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold">Email</div>
                  <div className="text-sm text-primary-foreground/70">
                    info@navaratrip.com
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg bg-primary-foreground/10">
                <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold">Lokasi</div>
                  <div className="text-sm text-primary-foreground/70">
                    Jl. Merr Boulevard No. 22, Rungkut, Surabaya
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card text-card-foreground rounded-2xl p-8 shadow-large">
            <h3 className="font-serif text-2xl font-bold mb-6">Kirim Pesan</h3>

            <form className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Nama Lengkap
                  </label>
                  <Input
                    placeholder="John Doe"
                    className="bg-muted/50 border-border"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    No. WhatsApp
                  </label>
                  <Input
                    placeholder="+62 8xxx-xxxx-xxxx"
                    className="bg-muted/50 border-border"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Email</label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  className="bg-muted/50 border-border"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Destinasi yang Diminati
                </label>
                <Input
                  placeholder="Labuan Bajo, Bromo, Bali..."
                  className="bg-muted/50 border-border"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Pesan</label>
                <Textarea
                  placeholder="Ceritakan rencana perjalanan Anda..."
                  rows={4}
                  className="bg-muted/50 border-border resize-none"
                />
              </div>

              <Button variant="hero" size="lg" className="w-full">
                <Send className="w-4 h-4" />
                Kirim Pesan
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
