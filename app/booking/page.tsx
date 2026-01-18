"use client"

import type React from "react"
import { Suspense, useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { MapPin, Calendar, Clock, Users, ChevronLeft, Search, ArrowRight, Phone, LayoutGrid } from "lucide-react"
import { Button } from "@/components/ui/button"

type BusType = { id: number; name: string }

type ApiBus = {
  id: number
  name: string
  plateNo: string
  capacity: number
  price: number | null
  imageUrl: string | null
  busType: { id: number; name: string } | null
}

type ApiPage<T> = {
  data: T[]
  meta: {
    page: number
    per_page: number
    total: number
    total_pages: number
    range?: { start_date: string; end_date: string }
  }
}

const DEFAULT_PER_PAGE = 8

function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID").format(n)
}

function assetUrl(relative: string | null | undefined) {
  if (!relative) return null
  const base = process.env.NEXT_PUBLIC_DASHBOARD_ASSET_BASE_URL || process.env.NEXT_PUBLIC_DASHBOARD_API_BASE_URL || ""
  return `${base}${relative.startsWith("/") ? "" : "/"}${relative}`
}

function buildQuery(q: Record<string, string | number | boolean | null | undefined>) {
  const p = new URLSearchParams()
  Object.entries(q).forEach(([k, v]) => {
    if (v === undefined || v === null || v === "") return
    p.set(k, String(v))
  })
  const s = p.toString()
  return s ? `?${s}` : ""
}

async function fetchJson<T>(path: string, query?: Record<string, any>) {
  const base = process.env.NEXT_PUBLIC_DASHBOARD_API_BASE_URL
  if (!base) throw new Error("NEXT_PUBLIC_DASHBOARD_API_BASE_URL belum diset di .env.local")

  const url = `${base}${path}${buildQuery(query || {})}`
  const res = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: "no-store",
  })
  const json = await res.json().catch(() => ({}) as any)
  if (!res.ok) throw new Error(json?.message ?? `Request gagal (${res.status})`)
  return json as T
}

function BookingContent() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    startDate: "",
    endDate: "",
    pickupTime: "08:00",
    selectedVehicleId: "",
    name: "",
    phone: "",
    notes: "",
  })

  const [isSearching, setIsSearching] = useState(false)

  const [busTypes, setBusTypes] = useState<BusType[]>([])
  const [vehicles, setVehicles] = useState<ApiBus[]>([])
  const [meta, setMeta] = useState<ApiPage<ApiBus>["meta"] | null>(null)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(DEFAULT_PER_PAGE)
  const [loadingList, setLoadingList] = useState(false)
  const [listError, setListError] = useState<string | null>(null)

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<"Semua" | number>("Semua")

  const debounceRef = useRef<any>(null)
  const lastReqKeyRef = useRef<string>("")

  const categories = useMemo(() => {
    return ["Semua" as const, ...busTypes.map((t) => t.id)] as const
  }, [busTypes])

  const categoryLabel = useMemo(() => {
    const map = new Map<number, string>()
    busTypes.forEach((t) => map.set(t.id, t.name))
    return map
  }, [busTypes])

  const filteredCountLabel = useMemo(() => {
    const total = meta?.total ?? vehicles.length
    return total
  }, [meta, vehicles.length])

  async function loadBusTypes() {
    const res = await fetchJson<{ data: BusType[] }>("/api/bus-types")
    setBusTypes(res.data || [])
  }

  function validateDatesOrThrow(start: string, end: string) {
    if (!start || !end) throw new Error("Tanggal mulai & selesai wajib diisi.")
    const m1 = /^(\d{4})-(\d{2})-(\d{2})$/.exec(start)
    const m2 = /^(\d{4})-(\d{2})-(\d{2})$/.exec(end)
    if (!m1 || !m2) throw new Error("Format tanggal harus YYYY-MM-DD.")
    if (start > end) throw new Error("Tanggal mulai tidak boleh setelah tanggal selesai.")
  }

  async function fetchAvailable(opts?: { nextPage?: number; append?: boolean }) {
    const start_date = formData.startDate
    const end_date = formData.endDate

    validateDatesOrThrow(start_date, end_date)

    const nextPage = opts?.nextPage ?? 1
    const bus_type_id = selectedCategory === "Semua" ? undefined : selectedCategory
    const q = searchQuery.trim() || undefined

    const reqKey = JSON.stringify({ start_date, end_date, nextPage, perPage, bus_type_id, q })
    lastReqKeyRef.current = reqKey

    setLoadingList(true)
    setListError(null)

    try {
      const res = await fetchJson<ApiPage<ApiBus>>("/api/buses/available", {
        start_date,
        end_date,
        page: nextPage,
        per_page: perPage,
        bus_type_id,
        q,
      })

      if (lastReqKeyRef.current !== reqKey) return

      setMeta(res.meta)
      setPage(res.meta.page)

      if (opts?.append) {
        setVehicles((prev) => [...prev, ...(res.data || [])])
      } else {
        setVehicles(res.data || [])
      }
    } catch (e: any) {
      if (lastReqKeyRef.current !== reqKey) return
      setVehicles([])
      setMeta(null)
      setListError(e?.message ?? "Gagal mengambil data armada.")
    } finally {
      if (lastReqKeyRef.current === reqKey) setLoadingList(false)
    }
  }

  useEffect(() => {
    loadBusTypes().catch(() => null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearching(true)

    try {
      setSelectedCategory("Semua")
      setSearchQuery("")
      setPerPage(DEFAULT_PER_PAGE)
      setPage(1)

      await fetchAvailable({ nextPage: 1, append: false })
      setStep(2)
    } catch (err: any) {
      setListError(err?.message ?? "Gagal mencari armada.")
    } finally {
      setIsSearching(false)
    }
  }

  useEffect(() => {
    if (step !== 2) return
    if (!formData.startDate || !formData.endDate) return

    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      fetchAvailable({ nextPage: 1, append: false }).catch(() => null)
    }, 350)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, selectedCategory, perPage, step])

  const handleSelectVehicle = (id: string) => {
    setFormData({ ...formData, selectedVehicleId: id })
    setStep(3)
  }

  const handleWhatsAppRedirect = () => {
    const selectedVehicle = vehicles.find((v) => String(v.id) === formData.selectedVehicleId)

    const message = `Halo Navara, saya ingin memesan armada:
    
🚌 *Armada:* ${selectedVehicle?.name ?? "-"}
📍 *Rute:* ${formData.origin} ke ${formData.destination}
📅 *Tanggal:* ${formData.startDate} s/d ${formData.endDate}
⏰ *Jam Jemput:* ${formData.pickupTime}
👤 *Nama:* ${formData.name}
📞 *WA:* ${formData.phone}
📝 *Catatan:* ${formData.notes || "-"}
    
Mohon info ketersediaan dan total biayanya. Terima kasih.`

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
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  step >= i ? "bg-gradient-earth text-white shadow-medium scale-110" : "bg-gray-100 text-gray-400"
                }`}
              >
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

            {listError ? (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {listError}
              </div>
            ) : null}

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
                  onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>

              <div className="flex items-end">
                <Button
                  type="submit"
                  disabled={isSearching}
                  variant="hero"
                  className="w-full h-[58px] rounded-xl font-bold text-lg shadow-medium flex items-center justify-center gap-3 transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isSearching ? (
                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                  ) : (
                    <Search className="w-5 h-5" />
                  )}
                  Cari Armada
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Step 2: Vehicle Selection */}
        {step === 2 && (
          <div className="transition-all duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
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
                    <MapPin className="w-3 h-3" /> {formData.origin} <ArrowRight className="w-3 h-3" />{" "}
                    {formData.destination}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-soft p-6 mb-8 border border-earth-pale/10">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Search Input */}
                <div className="flex-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-earth-mid flex items-center gap-2 mb-3">
                    <Search className="w-3.5 h-3.5" /> Cari Armada
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Ketik nama / plat / tipe..."
                      className="w-full p-4 pl-12 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-earth-mid focus:bg-white outline-none transition-all shadow-sm"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                  </div>
                </div>

                {/* Category Filter */}
                <div className="lg:w-auto">
                  <label className="text-xs font-bold uppercase tracking-widest text-earth-mid flex items-center gap-2 mb-3">
                    <LayoutGrid className="w-3.5 h-3.5" /> Kategori
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedCategory("Semua")}
                      className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                        selectedCategory === "Semua"
                          ? "bg-gradient-earth text-white shadow-medium"
                          : "bg-gray-50 text-gray-600 border border-gray-100 hover:bg-earth-pale/20 hover:border-earth-pale/30"
                      }`}
                    >
                      Semua
                    </button>

                    {busTypes.map((t) => {
                      const isActive = selectedCategory === t.id
                      return (
                        <button
                          key={t.id}
                          onClick={() => setSelectedCategory(t.id)}
                          className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                            isActive
                              ? "bg-gradient-earth text-white shadow-medium"
                              : "bg-gray-50 text-gray-600 border border-gray-100 hover:bg-earth-pale/20 hover:border-earth-pale/30"
                          }`}
                        >
                          {t.name}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Results count */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  Menampilkan <span className="font-bold text-earth-mid">{loadingList ? "…" : filteredCountLabel}</span>{" "}
                  armada
                  {selectedCategory !== "Semua" && (
                    <span>
                      {" "}
                      dalam kategori{" "}
                      <span className="font-bold text-earth-mid">
                        {categoryLabel.get(selectedCategory as number) ?? "—"}
                      </span>
                    </span>
                  )}
                  {searchQuery && (
                    <span>
                      {" "}
                      untuk pencarian "<span className="font-bold text-earth-mid">{searchQuery}</span>"
                    </span>
                  )}
                </p>

                {listError ? (
                  <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {listError}
                  </div>
                ) : null}
              </div>
            </div>

            {loadingList && vehicles.length === 0 ? (
              <div className="bg-white rounded-3xl shadow-soft p-12 border border-earth-pale/10 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-500" />
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">Mencari Armada...</h3>
                <p className="text-gray-500">Mohon tunggu sebentar.</p>
              </div>
            ) : vehicles.length === 0 ? (
              <div className="bg-white rounded-3xl shadow-soft p-12 border border-earth-pale/10 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">Armada Tidak Ditemukan</h3>
                <p className="text-gray-500 mb-6">Coba ubah kata kunci pencarian atau pilih kategori lain.</p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("Semua")
                  }}
                  variant="outline"
                  className="rounded-xl px-6"
                >
                  Reset Filter
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {vehicles.map((vehicle) => {
                    const catName = vehicle.busType?.name ?? "—"
                    const img = assetUrl(vehicle.imageUrl) || "/bus-vehicle.jpg"

                    return (
                      <div
                        key={vehicle.id}
                        className="bg-white rounded-2xl overflow-hidden shadow-medium border border-earth-pale/10 group hover:shadow-large transition-all duration-300 flex flex-col"
                      >
                        {/* Image Section*/}
                        <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-earth-pale/10 overflow-hidden">
                          <Image
                            src={img || "/placeholder.svg"}
                            alt={vehicle.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            unoptimized={img.startsWith("http")}
                          />
                          {/* Bus Type Badge */}
                          <div className="absolute top-3 left-3">
                            <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-bold uppercase tracking-wide text-earth-mid shadow-sm">
                              {catName}
                            </span>
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-5 flex flex-col flex-1">
                          
                          <div className="mb-2">
                            <h3 className="text-xl font-serif font-bold text-gray-900 mb-1">{vehicle.name}</h3>
                          </div>

                          {/* Capacity */}
                          <div className="flex items-center gap-2 mb-4 text-gray-600">
                            <Users className="w-4 h-4 text-earth-mid" />
                            <span className="text-sm font-medium">{vehicle.capacity} Kursi</span>
                          </div>

                          {/* Price & Button */}
                          <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                            <div className="min-w-0 flex-1">
                              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">
                                Mulai Dari
                              </p>
                              {vehicle.price == null ? (
                                <p className="text-sm font-medium text-gray-400">Hubungi admin</p>
                              ) : (
                                <p className="text-lg font-bold text-gray-900">
                                  Rp {formatRupiah(vehicle.price)}
                                  <span className="text-xs font-normal text-gray-400 ml-1">/hari</span>
                                </p>
                              )}
                            </div>

                            <Button
                              onClick={() => handleSelectVehicle(String(vehicle.id))}
                              variant="hero"
                              className="rounded-xl px-6 font-bold h-10 shadow-soft transition-transform hover:scale-105 shrink-0"
                            >
                              Pilih
                            </Button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Pagination (Load More) */}
                {meta && meta.page < meta.total_pages ? (
                  <div className="mt-10 flex justify-center">
                    <Button
                      variant="outline"
                      className="rounded-xl px-8 h-12 bg-transparent"
                      disabled={loadingList}
                      onClick={() => {
                        const next = (meta?.page ?? 1) + 1
                        fetchAvailable({ nextPage: next, append: true }).catch(() => null)
                      }}
                    >
                      {loadingList ? "Memuat..." : "Muat Lagi"}
                    </Button>
                  </div>
                ) : null}
              </>
            )}
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
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-earth-mid">
                  Catatan Perjalanan (Opsional)
                </label>
                <textarea
                  rows={4}
                  placeholder="Ceritakan detail acara atau permintaan khusus Anda di sini..."
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-earth-mid focus:bg-white outline-none transition-all shadow-sm resize-none"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
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
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </div>
                  Pesan via WhatsApp
                </Button>
                <p className="text-center text-xs text-gray-400 mt-4 px-8">
                  Dengan mengeklik tombol di atas, data pesanan akan dikirimkan langsung ke admin Navara untuk diproses
                  lebih lanjut.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function BookingPage() {
  return (
    <Suspense fallback={null}>
      <BookingContent />
    </Suspense>
  )
}
