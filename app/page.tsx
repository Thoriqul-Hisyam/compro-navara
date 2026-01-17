"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/DestinationsSection";
import FleetSection from "@/components/PackagesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function BusBookingSystem() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <FleetSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
