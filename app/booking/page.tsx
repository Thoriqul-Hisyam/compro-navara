"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Bus, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  ChevronRight, 
  ChevronLeft,
  Check,
  Tv,
  Music,
  Wind,
  Zap,
  Coffee,
  ShieldCheck,
  Search,
  ArrowRight,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";

const fleet = [
  {
    id: "hiace-premio",
    name: "Toyota Hiace Premio",
    category: "Mobil Penumpang",
    image: "/hiace-studio.png",
    capacity: "14 Seats",
    price: 1100000,
    facilities: ["Full AC", "Audio System", "Driver", "Asuransi"],
    icons: [Wind, Music, ShieldCheck]
  },
  {
    id: "luxury-bus",
    name: "Luxury Big Bus",
    category: "Bus",
    image: "/bus-studio.png",
    capacity: "45-59 Seats",
    price: 3500000,
    facilities: ["Full AC", "TV/Karaoke", "Reclining Seat", "Charging Point", "Cool Box"],
    icons: [Wind, Tv, Zap, Coffee]
  }
];

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    startDate: "",
    endDate: "",
    pickupTime: "08:00",
    selectedVehicleId: "",
    name: "",
    phone: "",
    notes: ""
  });

  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    // Simulate API delay
    setTimeout(() => {
      setIsSearching(false);
      setStep(2);
    }, 800);
  };

  const handleSelectVehicle = (id: string) => {
    setFormData({ ...formData, selectedVehicleId: id });
    setStep(3);
  };

  const handleWhatsAppRedirect = () => {
    const selectedVehicle = fleet.find(v => v.id === formData.selectedVehicleId);
    const message = `Halo Navara, saya ingin memesan armada:
    
🚌 *Armada:* ${selectedVehicle?.name}
📍 *Rute:* ${formData.origin} ke ${formData.destination}
📅 *Tanggal:* ${formData.startDate} s/d ${formData.endDate}
⏰ *Jam Jemput:* ${formData.pickupTime}
👤 *Nama:* ${formData.name}
📞 *WA:* ${formData.phone}
📝 *Catatan:* ${formData.notes || "-"}
    
Mohon info ketersediaan dan total biayanya. Terima kasih.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/628113556799?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Small Header Banner */}
      <div className="bg-gradient-earth pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-earth opacity-40" />
        <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">
                Pemesanan <span className="text-secondary italic">Navara</span>
            </h1>
            <p className="text-white/70 max-w-lg mx-auto text-sm md:text-base">
                Lengkapi detail perjalanan Anda untuk mendapatkan layanan transportasi terbaik dari kami.
            </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl -mt-8 relative z-20 pb-20">
        
        {/* Progress Header */}
        <div className="bg-white rounded-2xl shadow-soft p-6 mb-12 flex items-center justify-between max-w-xl mx-auto border border-earth-pale/20">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center group">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                step >= i 
                  ? "bg-gradient-earth text-white shadow-medium scale-110" 
                  : "bg-gray-100 text-gray-400"
              }`}>
                {i}
              </div>
              {i < 3 && (
                <div className={`w-16 md:w-24 h-0.5 mx-2 rounded-full ${step > i ? "bg-earth-mid" : "bg-gray-100"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Search Form */}
        {step === 1 && (
          <div className="bg-white rounded-3xl shadow-large p-8 md:p-12 border border-earth-pale/10">
            <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-2">
                    Detail <span className="text-gradient-earth">Perjalanan</span>
                </h2>
                <div className="w-20 h-1 bg-gradient-gold rounded-full" />
            </div>
            
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-earth-mid flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5" /> Kota Keberangkatan
                </label>
                <input 
                  required
                  type="text"
                  placeholder="Contoh: Surabaya"
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-earth-mid focus:bg-white outline-none transition-all shadow-sm"
                  value={formData.origin}
                  onChange={(e) => setFormData({...formData, origin: e.target.value})}
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-earth-mid flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5" /> Kota Tujuan
                </label>
                <input 
                  required
                  type="text"
                  placeholder="Contoh: Bali"
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-earth-mid focus:bg-white outline-none transition-all shadow-sm"
                  value={formData.destination}
                  onChange={(e) => setFormData({...formData, destination: e.target.value})}
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-earth-mid flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" /> Jam Jemput
                </label>
                <input 
                  required
                  type="time"
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-earth-mid focus:bg-white outline-none transition-all shadow-sm text-gray-700"
                  value={formData.pickupTime}
                  onChange={(e) => setFormData({...formData, pickupTime: e.target.value})}
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-earth-mid flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" /> Tanggal Mulai
                </label>
                <input 
                  required
                  type="date"
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-earth-mid focus:bg-white outline-none transition-all shadow-sm text-gray-700"
                  value={formData.startDate}
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-earth-mid flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" /> Tanggal Selesai
                </label>
                <input 
                  required
                  type="date"
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-earth-mid focus:bg-white outline-none transition-all shadow-sm text-gray-700"
                  value={formData.endDate}
                  onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                />
              </div>

              <div className="flex items-end">
                <Button 
                  type="submit"
                  disabled={isSearching}
                  variant="hero"
                  className="w-full h-[58px] rounded-xl font-bold text-lg shadow-medium flex items-center justify-center gap-3 transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isSearching ? <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" /> : <Search className="w-5 h-5" />}
                  Cari Armada
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Step 2: Vehicle Selection */}
        {step === 2 && (
          <div className="transition-all duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setStep(1)}
                  className="p-3 bg-white border border-earth-pale/20 rounded-full shadow-soft text-earth-mid hover:bg-earth-pale/10 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <div>
                  <h2 className="text-2xl font-serif font-bold text-gray-900 italic">Pilih Armada</h2>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <MapPin className="w-3 h-3" /> {formData.origin} <ArrowRight className="w-3 h-3" /> {formData.destination}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {fleet.map((vehicle) => (
                <div key={vehicle.id} className="bg-white rounded-3xl overflow-hidden shadow-medium border border-earth-pale/10 group flex flex-col md:flex-row hover:shadow-large transition-all duration-500">
                  <div className="md:w-[45%] relative aspect-[4/3] md:aspect-auto bg-gradient-to-br from-gray-50 to-earth-pale/5 p-8 flex items-center overflow-hidden">
                    <Image 
                      src={vehicle.image} 
                      alt={vehicle.name} 
                      width={400} 
                      height={300} 
                      className="object-contain group-hover:scale-110 transition-transform duration-700 relative z-10"
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-earth-mid/10 blur-3xl rounded-full" />
                  </div>
                  <div className="flex-1 p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-[11px] uppercase font-black tracking-[0.2em] text-earth-mid">{vehicle.category}</span>
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 rounded-full text-gray-500">
                          <Users className="w-3.5 h-3.5" />
                          <span className="text-xs font-bold">{vehicle.capacity}</span>
                        </div>
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">{vehicle.name}</h3>
                      <div className="flex flex-wrap gap-3 mb-8">
                        {vehicle.icons.map((Icon, i) => (
                          <div key={i} className="p-2.5 bg-gray-50 rounded-xl text-earth-mid/60 border border-gray-100 flex items-center justify-center">
                            <Icon className="w-4.5 h-4.5" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Mulai Dari</p>
                        <p className="text-xl font-bold text-gray-900">
                          Rp {vehicle.price.toLocaleString('id-ID')}
                          <span className="text-xs font-normal text-gray-400 ml-1">/hari</span>
                        </p>
                      </div>
                      <Button 
                        onClick={() => handleSelectVehicle(vehicle.id)}
                        variant="hero"
                        className="rounded-xl px-8 font-bold h-12 shadow-soft transition-transform hover:scale-105"
                      >
                        Pilih
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Contact Details */}
        {step === 3 && (
          <div className="max-w-xl mx-auto transition-all duration-500">
            <div className="flex items-center gap-4 mb-8">
              <button 
                onClick={() => setStep(2)}
                className="p-3 bg-white border border-earth-pale/20 rounded-full shadow-soft text-earth-mid hover:bg-earth-pale/10 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-serif font-bold text-gray-900 italic">Konfirmasi Pesanan</h2>
            </div>

            <div className="bg-white rounded-3xl shadow-large p-8 md:p-12 border border-earth-pale/10 space-y-8">
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-earth-mid">Nama Lengkap</label>
                <input 
                  type="text"
                  placeholder="Masukkan nama Anda"
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-earth-mid focus:bg-white outline-none transition-all shadow-sm"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-earth-mid">Nomor WhatsApp</label>
                <div className="relative">
                    <input 
                    type="tel"
                    placeholder="08123456789"
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-earth-mid focus:bg-white outline-none transition-all shadow-sm pl-12"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-earth-mid">Catatan Perjalanan (Opsional)</label>
                <textarea 
                  rows={4}
                  placeholder="Ceritakan detail acara atau permintaan khusus Anda di sini..."
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-earth-mid focus:bg-white outline-none transition-all shadow-sm resize-none"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                />
              </div>

              <div className="pt-4">
                <Button 
                    onClick={handleWhatsAppRedirect}
                    disabled={!formData.name || !formData.phone}
                    className="w-full py-8 rounded-2xl bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold text-lg shadow-medium flex items-center justify-center gap-4 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100"
                >
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                    </div>
                    Pesan via WhatsApp
                </Button>
                <p className="text-center text-xs text-gray-400 mt-4 px-8">
                    Dengan mengeklik tombol di atas, data pesanan akan dikirimkan langsung ke admin Navara untuk diproses lebih lanjut.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
