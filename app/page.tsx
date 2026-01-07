"use client";

import { useState } from "react";
import {
  Calendar,
  Bus,
  MapPin,
  Phone,
  Clock,
  Users,
  ChevronRight,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

export default function BusBookingSystem() {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  interface Armada {
    id: string;
    nama: string;
    kapasitas: string;
    harga: string;
    available: boolean;
  }

  const [availableBuses, setAvailableBuses] = useState<Armada[]>([]);

  const [formData, setFormData] = useState({
    tanggalBerangkat: "",
    tanggalKembali: "",
    armada: "",
    titikJemput: "",
    tujuan: "",
    namaLengkap: "",
    noTelepon: "",
    jumlahPenumpang: "",
    keperluan: "",
    catatan: "",
  });

  // Simulasi data booking (dalam real app, ini dari database)
  const bookedSchedule: Record<string, string[]> = {
    "2026-01-15": ["mini", "medium"],
    "2026-01-20": ["big", "luxury"],
    "2026-01-25": ["mini", "medium", "big", "luxury"],
    "2026-02-01": ["luxury"],
  };

  const armadaList = [
    {
      id: "mini",
      nama: "Mini Bus",
      kapasitas: "15-20 seat",
      harga: "Mulai 1.5jt/hari",
    },
    {
      id: "medium",
      nama: "Medium Bus",
      kapasitas: "25-35 seat",
      harga: "Mulai 2.5jt/hari",
    },
    {
      id: "big",
      nama: "Big Bus",
      kapasitas: "45-60 seat",
      harga: "Mulai 4jt/hari",
    },
    {
      id: "luxury",
      nama: "Luxury Bus",
      kapasitas: "30-40 seat",
      harga: "Mulai 5jt/hari",
    },
  ];

  const checkAvailability = () => {
    if (!formData.tanggalBerangkat || !formData.tanggalKembali) return;

    // Cek semua tanggal dalam rentang
    const start = new Date(formData.tanggalBerangkat);
    const end = new Date(formData.tanggalKembali);
    const bookedBuses = new Set();

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split("T")[0];
      if (bookedSchedule[dateStr]) {
        bookedSchedule[dateStr].forEach((bus) => bookedBuses.add(bus));
      }
    }

    // Filter armada yang tersedia
    const available = armadaList.map((armada) => ({
      ...armada,
      available: !bookedBuses.has(armada.id),
    }));

    setAvailableBuses(available);
    setStep(2);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const selectedArmada = armadaList.find((a) => a.id === formData.armada);
    const message = `*PEMESANAN ARMADA BUS*

📅 *Jadwal Sewa:*
Dari: ${formData.tanggalBerangkat}
Sampai: ${formData.tanggalKembali}

🚌 *Armada:*
${selectedArmada?.nama} (${selectedArmada?.kapasitas})

📍 *Rute:*
Penjemputan: ${formData.titikJemput}
Tujuan: ${formData.tujuan}

👤 *Data Pemesan:*
Nama: ${formData.namaLengkap}
No. HP: ${formData.noTelepon}
Jumlah Penumpang: ${formData.jumlahPenumpang} orang
Keperluan: ${formData.keperluan}

📝 *Catatan:*
${formData.catatan || "-"}`;

    const whatsappUrl = `https://wa.me/6289664365030?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const allBusesBooked =
    availableBuses.length > 0 && availableBuses.every((bus) => !bus.available);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#B57A36] to-[#5C3B18] text-white shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <Bus className="w-10 h-10" />
            <h1 className="text-3xl font-bold">Navara</h1>
          </div>
          <p className="text-white/90">Solusi transportasi armada terpercaya</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= s
                    ? "bg-gradient-to-r from-[#B57A36] to-[#5C3B18] text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {s}
              </div>
              {s < 4 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    step > s
                      ? "bg-gradient-to-r from-[#B57A36] to-[#5C3B18]"
                      : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Check Jadwal & Ketersediaan */}
        {step === 1 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-8 h-8 text-[#B57A36]" />
              <h2 className="text-2xl font-bold text-gray-800">
                Cek Ketersediaan Armada
              </h2>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-blue-800 text-sm">
                Pilih tanggal untuk mengecek ketersediaan armada bus. Armada
                yang sudah penuh tidak dapat dipilih.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Tanggal Mulai Sewa
                </label>
                <input
                  type="date"
                  name="tanggalBerangkat"
                  value={formData.tanggalBerangkat}
                  onChange={handleChange}
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-[#B57A36] focus:outline-none text-lg"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Tanggal Selesai Sewa
                </label>
                <input
                  type="date"
                  name="tanggalKembali"
                  value={formData.tanggalKembali}
                  onChange={handleChange}
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-[#B57A36] focus:outline-none text-lg"
                  min={formData.tanggalBerangkat}
                />
              </div>

              <button
                onClick={checkAvailability}
                disabled={
                  !formData.tanggalBerangkat || !formData.tanggalKembali
                }
                className="w-full flex items-center justify-center gap-3 p-4 rounded-lg transition bg-gradient-to-r from-[#B57A36] to-[#5C3B18] text-white shadow hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg"
              >
                Cek Ketersediaan
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Pilih Armada (dengan status ketersediaan) */}
        {step === 2 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Bus className="w-8 h-8 text-[#B57A36]" />
              <h2 className="text-2xl font-bold text-gray-800">
                Pilih Armada Bus
              </h2>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="text-green-800 text-sm">
                <p className="font-semibold mb-1">
                  Periode: {formData.tanggalBerangkat} s/d{" "}
                  {formData.tanggalKembali}
                </p>
                <p>
                  Berikut armada yang tersedia untuk tanggal yang Anda pilih.
                </p>
              </div>
            </div>

            {allBusesBooked && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div className="text-red-800 text-sm">
                  <p className="font-semibold mb-1">
                    Maaf, semua armada sudah penuh
                  </p>
                  <p>
                    Silakan pilih tanggal lain atau hubungi kami untuk informasi
                    lebih lanjut.
                  </p>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {availableBuses.map((armada) => (
                <div
                  key={armada.id}
                  onClick={() =>
                    armada.available &&
                    setFormData({ ...formData, armada: armada.id })
                  }
                  className={`p-6 border-2 rounded-lg transition relative ${
                    !armada.available
                      ? "border-gray-200 bg-gray-100 cursor-not-allowed opacity-60"
                      : formData.armada === armada.id
                      ? "border-[#B57A36] bg-gradient-to-r from-[#B57A36]/10 to-[#5C3B18]/10 cursor-pointer"
                      : "border-gray-200 hover:border-[#B57A36]/50 cursor-pointer"
                  }`}
                >
                  {!armada.available && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      PENUH
                    </div>
                  )}
                  {armada.available && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      TERSEDIA
                    </div>
                  )}

                  <h3 className="text-xl font-bold text-gray-800 mb-2 pr-20">
                    {armada.nama}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Users className="w-4 h-4" />
                    <span>{armada.kapasitas}</span>
                  </div>
                  <p className="text-[#B57A36] font-semibold">{armada.harga}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 p-4 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50"
              >
                Ubah Tanggal
              </button>
              <button
                onClick={() => formData.armada && setStep(3)}
                disabled={!formData.armada}
                className="flex-1 flex items-center justify-center gap-3 p-4 rounded-lg transition bg-gradient-to-r from-[#B57A36] to-[#5C3B18] text-white shadow hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                Lanjut
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Lokasi */}
        {step === 3 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-8 h-8 text-[#B57A36]" />
              <h2 className="text-2xl font-bold text-gray-800">
                Detail Perjalanan
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Titik Penjemputan
                </label>
                <input
                  type="text"
                  name="titikJemput"
                  value={formData.titikJemput}
                  onChange={handleChange}
                  placeholder="Contoh: Terminal Bungurasih, Surabaya"
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-[#B57A36] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Tujuan
                </label>
                <input
                  type="text"
                  name="tujuan"
                  value={formData.tujuan}
                  onChange={handleChange}
                  placeholder="Contoh: Malioboro, Yogyakarta"
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-[#B57A36] focus:outline-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 p-4 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50"
                >
                  Kembali
                </button>
                <button
                  onClick={() =>
                    formData.titikJemput && formData.tujuan && setStep(4)
                  }
                  disabled={!formData.titikJemput || !formData.tujuan}
                  className="flex-1 flex items-center justify-center gap-3 p-4 rounded-lg transition bg-gradient-to-r from-[#B57A36] to-[#5C3B18] text-white shadow hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  Lanjut
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Phone className="w-8 h-8 text-[#B57A36]" />
              <h2 className="text-2xl font-bold text-gray-800">Data Pemesan</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="namaLengkap"
                  value={formData.namaLengkap}
                  onChange={handleChange}
                  placeholder="Masukkan nama lengkap"
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-[#B57A36] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Nomor Telepon/WhatsApp
                </label>
                <input
                  type="tel"
                  name="noTelepon"
                  value={formData.noTelepon}
                  onChange={handleChange}
                  placeholder="Contoh: 081234567890"
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-[#B57A36] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Jumlah Penumpang
                </label>
                <input
                  type="number"
                  name="jumlahPenumpang"
                  value={formData.jumlahPenumpang}
                  onChange={handleChange}
                  placeholder="Contoh: 25"
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-[#B57A36] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Keperluan
                </label>
                <select
                  name="keperluan"
                  value={formData.keperluan}
                  onChange={handleChange}
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-[#B57A36] focus:outline-none"
                >
                  <option value="">Pilih keperluan</option>
                  <option value="Wisata">Wisata</option>
                  <option value="Study Tour">Study Tour</option>
                  <option value="Ziarah">Ziarah</option>
                  <option value="Gathering">Gathering</option>
                  <option value="Acara Keluarga">Acara Keluarga</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Catatan Tambahan (Opsional)
                </label>
                <textarea
                  name="catatan"
                  value={formData.catatan}
                  onChange={handleChange}
                  placeholder="Contoh: Perlu tambahan fasilitas musik, dll"
                  rows={3}
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-[#B57A36] focus:outline-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 p-4 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50"
                >
                  Kembali
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={
                    !formData.namaLengkap ||
                    !formData.noTelepon ||
                    !formData.jumlahPenumpang ||
                    !formData.keperluan
                  }
                  className="flex-1 flex items-center justify-center gap-3 p-4 rounded-lg transition bg-gradient-to-r from-[#B57A36] to-[#5C3B18] text-white shadow hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  <Phone className="w-5 h-5" />
                  Pesan via WhatsApp
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-white border-t mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-gray-600">
          <p>©2025 Navara. Semua hak dilindungi.</p>
        </div>
      </div>
    </div>
  );
}
