import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bajatama Group - Kontraktor Profesional",
  description:
    "Kontraktor profesional yang mengutamakan kualitas, ketepatan waktu, dan keamanan.",
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
