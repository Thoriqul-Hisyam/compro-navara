type Query = Record<string, string | number | boolean | null | undefined>;

function toQueryString(q: Query = {}) {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(q)) {
    if (v === undefined || v === null || v === "") continue;
    params.set(k, String(v));
  }
  const s = params.toString();
  return s ? `?${s}` : "";
}

const API_BASE = process.env.NEXT_PUBLIC_DASHBOARD_API_BASE_URL;

if (!API_BASE) {
  console.warn("NEXT_PUBLIC_DASHBOARD_API_BASE_URL belum diset di .env.local");
}

export async function publicGet<T>(
  path: string,
  query?: Query,
  opts?: { cache?: RequestCache }
): Promise<T> {
  const url = `${API_BASE}${path}${toQueryString(query)}`;

  const res = await fetch(url, {
    method: "GET",
    cache: opts?.cache ?? "no-store",
    headers: {
      Accept: "application/json",
    },
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg =
      typeof json?.message === "string" && json.message.trim()
        ? json.message
        : `Request gagal (${res.status})`;
    throw new Error(msg);
  }

  return json as T;
}

export function assetUrl(relative: string | null | undefined) {
  if (!relative) return null;
  const base = process.env.NEXT_PUBLIC_DASHBOARD_ASSET_BASE_URL || API_BASE || "";
  return `${base}${relative.startsWith("/") ? "" : "/"}${relative}`;
}
