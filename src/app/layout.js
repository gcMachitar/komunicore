import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "KomuniCore — Barangay Disaster Relief Operating System",
  description: "Offline-first barangay disaster relief and civic operating system for Philippine local governance and COA compliance. Manage evacuees, distribute supplies, and generate audit-ready reports.",
  keywords: "barangay, disaster relief, Philippines, COA, DRRM, evacuation, offline-first",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-screen flex flex-col" style={{ fontFamily: 'var(--font-inter), system-ui, -apple-system, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
