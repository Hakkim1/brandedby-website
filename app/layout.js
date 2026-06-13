import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import CookieBanner from "@/components/CookieBanner";
import LayoutWrapper from "@/components/LayoutWrapper";
import InteractiveGrid from "@/components/InteractiveGrid";

export const metadata = {
  title: "Brandedby Studios | Building Brands for New Businesses",
  description:
    "Brandedby Studios is a premium creative branding agency and CMO growth marketing partner for India's next generation of new businesses. Incubation, Design, and Identity Systems under one roof.",
  metadataBase: new URL("http://localhost:3000"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <head />
      <body className="antialiased overflow-x-hidden relative min-h-screen bg-bg transition-colors duration-300">


        {/* Global Tech Overlays */}
        <Preloader />
        <InteractiveGrid />
        <CustomCursor />
        <CookieBanner />
        <Navbar />

        {/* GSAP & Smooth Scroll wrapper */}
        <LayoutWrapper>
          <main className="relative pt-[76px] z-10 w-full">{children}</main>
          <Footer />
        </LayoutWrapper>
      </body>
    </html>
  );
}
