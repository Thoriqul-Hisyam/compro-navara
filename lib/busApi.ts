import { publicGet } from "./publicApi";

export type BusType = { id: number; name: string };

export type Bus = {
  id: number;
  name: string;
  plateNo: string;
  capacity: number;
  price: number | null;
  imageUrl: string | null; 
  busType: BusType | null;
};

export type Paginated<T> = {
  data: T[];
  meta: {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    range?: { start_date: string; end_date: string }; 
  };
};

export async function listBusTypes() {
  return publicGet<{ data: BusType[] }>("/api/bus-types", undefined, { cache: "force-cache" });
}

export async function listBuses(params?: {
  page?: number;
  per_page?: number;
  q?: string;
  bus_type_id?: number;
}) {
  return publicGet<Paginated<Bus>>("/api/buses", params, { cache: "no-store" });
}

export async function listAvailableBuses(params: {
  start_date: string; // YYYY-MM-DD
  end_date: string;   // YYYY-MM-DD
  page?: number;
  per_page?: number;
  q?: string;
  bus_type_id?: number;
}) {
  return publicGet<Paginated<Bus>>("/api/buses/available", params, { cache: "no-store" });
}
