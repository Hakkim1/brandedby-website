"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ScrambleText } from "./Navbar";
import Logo from "@/components/Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-bg pt-20 pb-8 z-20">
      {/* Visual background lines alignment indicator */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple to-transparent opacity-20" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Col 1: Brand Info */}
        <div className="flex flex-col gap-4">
          <div className="w-full">
              <Logo className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.02]" />
            </div>
          <p className="text-muted text-xs leading-relaxed max-w-xs font-normal">
            Building premium visual identities and growth marketing systems for India's next generation of new businesses.
          </p>
          <div className="mt-2 font-body text-xs text-purple/60 uppercase tracking-wider font-semibold">
            ● EST. 2026 // WORKING GLOBALLY
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div>
          <h5 className="font-body text-sm text-purple font-bold uppercase tracking-wider mb-6">
            Explore
          </h5>
          <ul className="flex flex-col gap-3 font-body text-sm">
            <li>
              <Link href="/work" className="text-secondary hover:text-purple transition-colors cursor-pointer">
                <ScrambleText text="Our Work" />
              </Link>
            </li>
            <li>
              <Link href="/story" className="text-secondary hover:text-purple transition-colors cursor-pointer">
                <ScrambleText text="Our Story" />
              </Link>
            </li>
            <li>
              <Link href="/team" className="text-secondary hover:text-purple transition-colors cursor-pointer">
                <ScrambleText text="Meet the Team" />
              </Link>
            </li>
            <li>
              <Link href="/insights" className="text-secondary hover:text-purple transition-colors cursor-pointer">
                <ScrambleText text="Daily Insights" />
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-secondary hover:text-purple transition-colors cursor-pointer">
                <ScrambleText text="Contact Us" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Services Offered */}
        <div>
          <h5 className="font-body text-sm text-purple font-bold uppercase tracking-wider mb-6">
            Services
          </h5>
          <ul className="flex flex-col gap-3 font-body text-sm text-muted">
            <li className="hover:text-primary transition-colors cursor-default">
              Brand Identity Systems
            </li>
            <li className="hover:text-primary transition-colors cursor-default">
              Premium Logo Design
            </li>
            <li className="hover:text-primary transition-colors cursor-default">
              Social Media Strategy
            </li>
            <li className="hover:text-primary transition-colors cursor-default">
              New Business Launch Packages
            </li>
            <li className="hover:text-primary transition-colors cursor-default">
              Website & UI/UX Design
            </li>
            <li className="hover:text-primary transition-colors cursor-default">
              Performance Marketing
            </li>
          </ul>
        </div>

        {/* Col 4: Contact & Socials */}
        <div>
          <h5 className="font-body text-sm text-purple font-bold uppercase tracking-wider mb-6">
            Connect
          </h5>
          <ul className="flex flex-col gap-3 font-body text-sm">
            <li>
              <a
                href="mailto:brandedbystudio@gmail.com"
                className="text-secondary hover:text-purple transition-colors cursor-pointer block"
              >
                brandedbystudio@gmail.com
              </a>
            </li>
            <li className="text-muted cursor-default">
              Bangalore, India
            </li>
            <li className="pt-2">
              <a
                href="https://www.behance.net/brandedbystudios"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-purple hover:text-purple-light transition-colors cursor-pointer"
              >
                <span>Behance Portfolio</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="font-body text-xs text-muted tracking-wide text-center md:text-left">
          © {currentYear} BRANDBLOK STUDIO. ALL RIGHTS RESERVED.
        </div>
        <div className="font-body text-xs text-muted flex items-center gap-4 uppercase tracking-wider font-semibold">
          <span>Designed By Us</span>
          <span className="text-purple">//</span>
          <span>For India's New Businesses</span>
        </div>
      </div>
    </footer>
  );
}
