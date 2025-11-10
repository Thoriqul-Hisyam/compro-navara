'use client';
import React, { useState } from "react";
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Building2,
  Warehouse,
  Factory,
  Award,
  Users,
  Clock,
} from "lucide-react";

export default function BajatamaCompro() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const services = [
    {
      icon: <Building2 className="w-16 h-16" />,
      title: "Lapangan Padel",
      description:
        "Pembangunan lapangan padel berkualitas tinggi dengan standar internasional dan material premium",
      image:
        "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80",
    },
    {
      icon: <Warehouse className="w-16 h-16" />,
      title: "Gudang",
      description:
        "Konstruksi gudang modern dengan desain efisien, kapasitas besar, dan sistem keamanan terpadu",
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
    },
    {
      icon: <Factory className="w-16 h-16" />,
      title: "Pabrik",
      description:
        "Pembangunan pabrik dengan teknologi terkini, standar keamanan tinggi, dan efisiensi optimal",
      image:
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
    },
  ];

  const projects = [
    {
      name: "Padel Court Premium",
      location: "Jakarta",
      year: "2024",
      image:
        "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=600&q=80",
      category: "Sports Facility",
    },
    {
      name: "Warehouse Industrial",
      location: "Surabaya",
      year: "2023",
      image:
        "https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&q=80",
      category: "Industrial",
    },
    {
      name: "Manufacturing Plant",
      location: "Bekasi",
      year: "2023",
      image:
        "https://images.unsplash.com/photo-1565072087002-c31ae193fa3f?w=600&q=80",
      category: "Factory",
    },
    {
      name: "Sports Complex",
      location: "Bandung",
      year: "2022",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
      category: "Sports Facility",
    },
  ];

  const values = [
    {
      icon: <Award className="w-12 h-12" />,
      title: "Kualitas Terjamin",
      description: "Material premium dan pengerjaan profesional",
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Tim Berpengalaman",
      description: "Tenaga ahli bersertifikat dan terlatih",
    },
    {
      icon: <Clock className="w-12 h-12" />,
      title: "Tepat Waktu",
      description: "Komitmen menyelesaikan proyek sesuai jadwal",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                <Building2 className="w-6 h-6 text-slate-900" />
              </div>
              <div>
                <div className="text-2xl font-bold">BAJATAMA</div>
                <div className="text-xs text-gray-300">Since 2000</div>
              </div>
            </div>

            <div className="hidden md:flex space-x-8">
              <a
                href="#home"
                className="hover:text-white transition text-gray-300"
              >
                Beranda
              </a>
              <a
                href="#about"
                className="hover:text-white transition text-gray-300"
              >
                Tentang
              </a>
              <a
                href="#services"
                className="hover:text-white transition text-gray-300"
              >
                Layanan
              </a>
              <a
                href="#projects"
                className="hover:text-white transition text-gray-300"
              >
                Proyek
              </a>
              <a
                href="#contact"
                className="hover:text-white transition text-gray-300"
              >
                Kontak
              </a>
            </div>

            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#home"
                className="block px-3 py-2 hover:bg-slate-700 rounded"
              >
                Beranda
              </a>
              <a
                href="#about"
                className="block px-3 py-2 hover:bg-slate-700 rounded"
              >
                Tentang
              </a>
              <a
                href="#services"
                className="block px-3 py-2 hover:bg-slate-700 rounded"
              >
                Layanan
              </a>
              <a
                href="#projects"
                className="block px-3 py-2 hover:bg-slate-700 rounded"
              >
                Proyek
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 hover:bg-slate-700 rounded"
              >
                Kontak
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80"
            alt="Construction"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900 opacity-75"></div>
        </div>
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Bajatama Group
            </h1>
            <div className="w-24 h-1 bg-white mb-6"></div>
            <p className="text-2xl md:text-3xl mb-4 font-light">
              Kontraktor Bangun Padel, Gudang, Pabrik
            </p>
            <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-2xl">
              Berdiri sejak tahun 2000, Kami berkomitmen untuk menyediakan jasa
              layanan terbaik sebagai kontraktor, desainer, dan supplier
            </p>
            <a
              href="#contact"
              className="inline-flex items-center bg-white text-slate-900 px-8 py-4 rounded text-lg font-semibold hover:bg-gray-100 transition"
            >
              Konsultasi Gratis <ChevronRight className="ml-2" />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Tentang Kami
              </h2>
              <div className="w-20 h-1 bg-slate-900 mb-8"></div>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                Bajatama Group telah berpengalaman lebih dari 25 tahun dalam
                industri konstruksi. Sejak didirikan pada tahun 2000, kami telah
                menyelesaikan ratusan proyek dengan standar kualitas tertinggi.
              </p>
              <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                Dengan tim profesional yang berpengalaman, kami menghadirkan
                solusi konstruksi yang inovatif dan efisien untuk berbagai
                kebutuhan industri dan komersial.
              </p>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-5xl font-bold text-slate-900">25+</div>
                  <div className="text-gray-600 mt-2">Tahun Pengalaman</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold text-slate-900">500+</div>
                  <div className="text-gray-600 mt-2">Proyek Selesai</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold text-slate-900">100%</div>
                  <div className="text-gray-600 mt-2">Kepuasan Klien</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80"
                alt="Construction Team"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Mengapa Memilih Kami</h2>
            <div className="w-20 h-1 bg-white mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-white text-slate-900 rounded-full mb-6">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-300 text-lg">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Layanan Kami
            </h2>
            <div className="w-20 h-1 bg-slate-900 mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Kami menyediakan berbagai layanan konstruksi profesional untuk
              memenuhi kebutuhan bisnis Anda
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg mb-6 h-64">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-900 opacity-40 group-hover:opacity-60 transition"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Proyek Terkini
            </h2>
            <div className="w-20 h-1 bg-slate-900 mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg">
              Beberapa proyek yang telah kami selesaikan dengan sukses
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-slate-900 text-white px-4 py-2 rounded">
                    {project.year}
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">
                    {project.category}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    {project.name}
                  </h3>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{project.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Hubungi Kami
            </h2>
            <div className="w-20 h-1 bg-white mx-auto mb-6"></div>
            <p className="text-gray-300 text-lg">
              Siap membantu mewujudkan proyek konstruksi Anda
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-8 bg-white bg-opacity-5 rounded-lg hover:bg-opacity-10 transition">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white text-slate-900 rounded-full mb-4">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-xl mb-3">Telepon</h3>
              <p className="text-gray-300">+62 xxx-xxxx-xxxx</p>
            </div>
            <div className="text-center p-8 bg-white bg-opacity-5 rounded-lg hover:bg-opacity-10 transition">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white text-slate-900 rounded-full mb-4">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-xl mb-3">Email</h3>
              <p className="text-gray-300">info@bajatama.com</p>
            </div>
            <div className="text-center p-8 bg-white bg-opacity-5 rounded-lg hover:bg-opacity-10 transition">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white text-slate-900 rounded-full mb-4">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-xl mb-3">Lokasi</h3>
              <p className="text-gray-300">Surabaya, Indonesia</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                <Building2 className="w-6 h-6 text-black" />
              </div>
              <div>
                <div className="text-xl font-bold">BAJATAMA GROUP</div>
                <div className="text-xs text-gray-400">
                  Kontraktor Profesional Sejak 2000
                </div>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 mb-2">
                &copy; {new Date().getFullYear()} Bajatama Group. All rights
                reserved.
              </p>
              <p className="text-sm text-gray-500">Padel • Gudang • Pabrik</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
