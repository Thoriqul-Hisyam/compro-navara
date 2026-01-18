"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Bus, Car, ChevronLeft, ChevronRight, Truck, Users } from "lucide-react"
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
  meta: { page: number; per_page: number; total: number; total_pages: number }
}

const ITEMS_PER_PAGE = 8

function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID").format(n)
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

function assetUrl(relative: string | null | undefined) {
  if (!relative) return null
  const base =
    process.env.NEXT_PUBLIC_DASHBOARD_ASSET_BASE_URL ||
    process.env.NEXT_PUBLIC_DASHBOARD_API_BASE_URL ||
    ""
  return `${base}${relative.startsWith("/") ? "" : "/"}${relative}`
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
  const json = await res.json().catch(() => ({} as any))
  if (!res.ok) throw new Error(json?.message ?? `Request gagal (${res.status})`)
  return json as T
}

const FleetSection = () => {
  const [busTypes, setBusTypes] = useState<BusType[]>([])
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)

  const [rows, setRows] = useState<ApiBus[]>([])
  const [meta, setMeta] = useState<ApiPage<ApiBus>["meta"] | null>(null)

  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const totalPages = meta?.total_pages ?? 1

  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategory(categoryId)
    setCurrentPage(1)
  }

  const getCategoryIcon = (name: string) => {
    switch (name.toUpperCase()) {
      case "BUS":
        return Bus
      case "HI ACE":
        return Car
      default:
        return Truck
    }
  }

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const res = await fetchJson<{ data: BusType[] }>("/api/bus-types")
        if (!alive) return
        setBusTypes(res.data || [])
      } catch (e: any) {
        if (!alive) return
        setError(e?.message ?? "Gagal mengambil bus types.")
      }
    })()
    return () => {
      alive = false
    }
  }, [])

  useEffect(() => {
    let alive = true
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetchJson<ApiPage<ApiBus>>("/api/buses", {
          page: currentPage,
          per_page: ITEMS_PER_PAGE,
          bus_type_id: selectedCategory ?? undefined,
        })

        if (!alive) return
        setRows(res.data || [])
        setMeta(res.meta)
      } catch (e: any) {
        if (!alive) return
        setRows([])
        setMeta(null)
        setError(e?.message ?? "Gagal mengambil data armada.")
      } finally {
        if (alive) setLoading(false)
      }
    })()
    return () => {
      alive = false
    }
  }, [currentPage, selectedCategory])

  const paginatedFleet = useMemo(() => rows, [rows])

  return (
    <section id="packages" className="py-20 bg-[#f9f9f9]">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-6 leading-tight">
              Semua <span className="text-gradient-earth">Kendaraan</span> untuk
              <br />
              Semua <span className="text-gradient-earth">Perjalanan</span> Anda
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Bersama Navara, apapun kebutuhannya, Anda dapat memilih berbagai varian moda transportasi yang dapat
              disesuaikan dengan kebutuhan Anda.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange(null)}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                selectedCategory === null
                  ? "bg-gradient-earth text-white shadow-medium"
                  : "bg-gray-50 text-gray-600 border border-gray-100 hover:bg-earth-pale/20 hover:border-earth-pale/30"
              }`}
            >
              Semua
            </button>

            {busTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => handleCategoryChange(type.id)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  selectedCategory === type.id
                    ? "bg-gradient-earth text-white shadow-medium"
                    : "bg-gray-50 text-gray-600 border border-gray-100 hover:bg-earth-pale/20 hover:border-earth-pale/30"
                }`}
              >
                {type.name}
              </button>
            ))}
          </div>
        </div>

        {error ? (
          <div className="mb-8 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {/* Fleet Grid */}
        {loading && paginatedFleet.length === 0 ? (
          <div className="bg-white rounded-2xl border border-earth-pale/10 p-12 text-center shadow-soft">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Memuat Armada...</h3>
            <p className="text-gray-500">Mohon tunggu sebentar.</p>
          </div>
        ) : paginatedFleet.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {paginatedFleet.map((item) => {
                const catName = item.busType?.name ?? "—"
                const Icon = getCategoryIcon(catName)
                const img = assetUrl(item.imageUrl)

                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-medium border border-earth-pale/10 group hover:shadow-large transition-all duration-300 flex flex-col"
                  >
                    {/* Image Section - 16:9 aspect ratio */}
                    <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-earth-pale/10 overflow-hidden">
                      {img ? (
                        <Image
                          src={img}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Icon className="w-16 h-16 text-gray-300" />
                        </div>
                      )}

                      {/* Category Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-bold uppercase tracking-wide text-earth-mid shadow-sm">
                          {catName}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="mb-2">
                        <h3 className="text-xl font-serif font-bold text-gray-900 mb-1">{item.name}</h3>
                        <p className="text-xs text-gray-500 font-medium">{item.plateNo}</p>
                      </div>

                      {/* Capacity */}
                      <div className="flex items-center gap-2 mb-4 text-gray-600">
                        <Users className="w-4 h-4 text-earth-mid" />
                        <span className="text-sm font-medium">{item.capacity} Kursi</span>
                      </div>

                      {/* Price & Button */}
                      <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">
                            Mulai Dari
                          </p>
                          {item.price == null ? (
                            <p className="text-sm font-medium text-gray-400">Hubungi admin</p>
                          ) : (
                            <p className="text-lg font-bold text-gray-900">
                              Rp {formatRupiah(item.price)}
                              <span className="text-xs font-normal text-gray-400 ml-1">/hari</span>
                            </p>
                          )}
                        </div>

                        <Button
                          asChild
                          variant="hero"
                          className="rounded-xl px-5 font-bold h-10 shadow-soft transition-transform hover:scale-105 shrink-0"
                        >
                          <Link href="/booking">Pesan</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-white border border-gray-200 text-gray-600 hover:border-earth-mid hover:text-earth-mid"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Sebelumnya
                </button>
                <span className="text-sm text-gray-500 font-medium px-4 py-2.5 bg-white rounded-xl border border-gray-100">
                  Halaman <span className="text-earth-mid font-bold">{currentPage}</span> dari{" "}
                  <span className="text-gray-800 font-bold">{totalPages}</span>
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-white border border-gray-200 text-gray-600 hover:border-earth-mid hover:text-earth-mid"
                >
                  Selanjutnya
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-earth-pale/10 p-12 text-center shadow-soft">
            <div className="w-16 h-16 bg-earth-pale/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bus className="w-8 h-8 text-earth-mid" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Armada Tidak Ditemukan</h3>
            <p className="text-gray-500 mb-4">Tidak ada armada yang cocok dengan filter yang dipilih.</p>
            <Button onClick={() => handleCategoryChange(null)} variant="hero" className="rounded-xl px-6">
              Reset Filter
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

export default FleetSection
