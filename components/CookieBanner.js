"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:w-96 z-50 p-6 liquid-glass rounded-none glow-border flex flex-col gap-4 shadow-lg">
      <div>
        <h4 className="text-primary text-sm font-semibold mb-1 flex items-center gap-2">
          Can I have some cookies? 🍪
        </h4>
        <p className="text-secondary text-xs font-normal">
          Just the digital kind — to make your experience better.
        </p>
      </div>
      <div className="flex gap-3 mt-2">
        <button
          onClick={handleAccept}
          className="flex-1 text-center py-2.5 text-xs uppercase font-body font-bold tracking-wider bg-purple hover:bg-purple-light text-white border border-purple transition-all duration-300 cursor-pointer rounded-none"
        >
          Accept
        </button>
        <button
          onClick={handleDecline}
          className="flex-1 text-center py-2.5 text-xs uppercase font-body font-bold tracking-wider bg-transparent hover:bg-purple/10 text-purple border border-purple/40 hover:border-purple transition-all duration-300 cursor-pointer rounded-none"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
