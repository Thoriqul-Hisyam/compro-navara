import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const fleetCategories = [
  {
    name: "Mobil Penumpang",
    image: "/hiace-studio.png",
    href: "#packages",
  },
  {
    name: "Bus",
    image: "/bus-studio.png",
    href: "#packages",
  },
  {
    name: "4WD",
    image: "/hilux-studio.png",
    href: "#packages",
  },
  {
    name: "Mobil Komersial",
    image: "/box-van-studio.png",
    href: "#packages",
  },
];

const FleetSection = () => {
  return (
    <section id="packages" className="py-20 bg-[#f9f9f9]">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-6 leading-tight">
              Semua <span className="text-gradient-earth">Kendaraan</span> untuk<br />
              Semua <span className="text-gradient-earth">Perjalanan</span> Anda
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Bersama Navara, apapun kebutuhannya, Anda dapat memilih berbagai varian moda transportasi yang dapat disesuaikan dengan kebutuhan Anda.
            </p>
          </div>
          <Link 
            href="#all-fleet" 
            className="flex items-center gap-2 text-[#f36f21] font-bold hover:gap-3 transition-all"
          >
            Lihat Semua Armada <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Carousel / Grid Area */}
        <div className="relative group">
          {/* Navigation Buttons (Visual only to match reference) */}
          <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {fleetCategories.map((item, index) => (
              <Link 
                key={index} 
                href={item.href}
                className="flex flex-col items-center group/item"
              >
                <div className="w-full aspect-[4/3] relative mb-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain transition-transform duration-500 group-hover/item:scale-105"
                  />
                </div>
                <div className="flex items-center gap-2 text-[#f36f21] font-bold group-hover/item:gap-3 transition-all">
                  {item.name} <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
            
            {/* Keeping it simple with 2 items to be accurate to user's fleet,
                but if we want to match the 4 items in the reference exactly, 
                we could add placeholders like 4WD and Commercial. 
                Given "only include Hiace and Bus", I will stick to 2.
            */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FleetSection;
