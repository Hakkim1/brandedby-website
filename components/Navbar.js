"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";

import Logo from "@/components/Logo";

// Scramble Text component (retained as utility if needed, but not used in nav for better readability)
export function ScrambleText({ text, className = "" }) {
  const [displayText, setDisplayText] = useState(text);
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ#%*?[]@$";

  const handleMouseEnter = () => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iterations) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iterations >= text.length) {
        clearInterval(interval);
        setDisplayText(text);
      }
      iterations += 1 / 3;
    }, 30);
  };

  return (
    <span onMouseEnter={handleMouseEnter} className={className}>
      {displayText}
    </span>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Work", path: "/work" },
    { name: "Our Story", path: "/story" },
    { name: "Team", path: "/team" },
    { name: "Insights", path: "/insights" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 border-b ${
        scrolled
          ? "liquid-glass py-4"
          : "bg-transparent py-6 border-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center group cursor-pointer">
          <Logo className="h-9 sm:h-10 w-auto transition-transform duration-300 group-hover:scale-[1.02]" />
        </Link>

        {/* Desktop Navigation (Modern highly-readable typography) */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm font-body font-medium tracking-wide relative py-1 cursor-pointer transition-colors ${
                  isActive ? "text-purple" : "text-secondary hover:text-purple"
                }`}
              >
                <span>{link.name}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-purple rounded-none" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/contact"
            className="btn-cyber-purple flex items-center gap-2 group cursor-pointer"
          >
            <span>Book a Call</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-secondary hover:text-purple transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 top-[76px] w-full h-[calc(100vh-76px)] liquid-glass-dense z-30 flex flex-col items-center justify-center gap-8 border-t border-border transition-all duration-300 md:hidden ${
          mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"
        }`}
      >
        {navLinks.map((link) => {
          const isActive = pathname === link.path;
          return (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-xl font-heading font-bold tracking-wide cursor-pointer transition-colors ${
                isActive ? "text-purple" : "text-secondary"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
        <Link
          href="/contact"
          onClick={() => setMobileMenuOpen(false)}
          className="btn-cyber-purple mt-4 flex items-center gap-2"
        >
          <span>Book a Free Call</span>
        </Link>
      </div>
    </header>
  );
}
