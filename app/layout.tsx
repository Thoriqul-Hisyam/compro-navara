import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Navara - Partner di Setiap Kilometer",
  description:
    "Solusi transportasi terintegrasi dari Navara. Sewa mobil, bus, dan layanan pengemudi profesional untuk kebutuhan bisnis dan pribadi.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="font-[Poppins] text-gray-800 scroll-smooth">
        {children}
      </body>
    </html>
  );
}
