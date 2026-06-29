"use client";

import { useState } from "react";
import { ArrowRight, Send, Mail, MapPin, ExternalLink, Calendar } from "lucide-react";
import { ScrambleText } from "@/components/Navbar";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Brand Identity",
    budget: "₹15,000–₹50,000",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in all required fields (Name, Email, Message).");
      return;
    }
    setError("");
    setLoading(true);

    // Simulate api delivery
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="blueprint-grid min-h-screen pt-12 pb-24 relative z-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header section */}
        <section className="py-20 bg-surface/10 mb-16">
          <span className="font-body text-sm font-bold text-purple tracking-widest uppercase block mb-4">
            Get in Touch
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tighter leading-tight max-w-4xl text-left">
            Let's Build Something Real.
          </h1>
          <p className="text-secondary text-base font-normal max-w-2xl mt-6">
            We've been where you are. Tell us about your brand — and let's figure out the next step together.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Studio Info */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="p-6 bg-surface/40 border border-border rounded-none shadow-md flex flex-col gap-5">
              <span className="font-body text-sm font-bold text-purple tracking-widest uppercase block">
                Contact
              </span>
              <div className="flex items-center gap-3 font-body text-sm text-secondary">
                <Mail className="w-4 h-4 text-purple shrink-0" />
                <a href="mailto:brandedbystudio@gmail.com" className="hover:text-purple transition-colors">
                  brandedbystudio@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 font-body text-sm text-secondary">
                <MapPin className="w-4 h-4 text-purple shrink-0" />
                <span>India · Working Globally</span>
              </div>
              <div className="flex items-center gap-3 font-body text-sm">
                <ExternalLink className="w-4 h-4 text-purple shrink-0" />
                <a
                  href="https://behance.net/hiddengraphdesigns"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple hover:underline"
                >
                  behance.net/hiddengraphdesigns
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-8 bg-surface border border-border rounded-none p-8 shadow-xl">
            <h3 className="font-heading font-extrabold text-xl text-primary mb-6 uppercase tracking-tight">
              Tell Us About Your Project
            </h3>

            {submitted ? (
              <div className="text-center py-12 flex flex-col items-center gap-4">
                <span className="font-body text-xs font-bold text-purple bg-purple/10 border border-purple/20 px-4 py-2 rounded-none">
                  Delivery Success
                </span>
                <h4 className="font-heading font-bold text-lg text-primary">
                  Message Sent Successfully
                </h4>
                <p className="text-secondary text-sm max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out! We have registered your details and will contact you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {error && <div className="text-sm text-purple font-body font-semibold">[ ERROR: {error} ]</div>}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="flex flex-col gap-2">
                    <label className="font-body text-sm font-semibold text-secondary uppercase tracking-wider">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="What should we call you?"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-surface-2 border border-border focus:border-purple focus:ring-1 focus:ring-purple focus:outline-none p-3.5 rounded-none text-sm text-primary placeholder-muted font-body transition-all"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label className="font-body text-sm font-semibold text-secondary uppercase tracking-wider">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-surface-2 border border-border focus:border-purple focus:ring-1 focus:ring-purple focus:outline-none p-3.5 rounded-none text-sm text-primary placeholder-muted font-body transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div className="flex flex-col gap-2">
                    <label className="font-body text-sm font-semibold text-secondary uppercase tracking-wider">
                      Phone Number (optional)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-surface-2 border border-border focus:border-purple focus:ring-1 focus:ring-purple focus:outline-none p-3.5 rounded-none text-sm text-primary placeholder-muted font-body transition-all"
                    />
                  </div>

                  {/* Service Select */}
                  <div className="flex flex-col gap-2">
                    <label className="font-body text-sm font-semibold text-secondary uppercase tracking-wider">
                      Service You Need *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full bg-surface-2 border border-border focus:border-purple focus:ring-1 focus:ring-purple focus:outline-none p-3.5 rounded-none text-sm text-primary font-body cursor-pointer transition-all"
                    >
                      <option value="Brand Identity">Brand Identity Systems</option>
                      <option value="Logo Design">Premium Logo Design</option>
                      <option value="Social Media Branding">Social Media Branding</option>
                      <option value="New Business Package">New Business Brand Package</option>
                      <option value="Visual Strategy">Visual Strategy Consulting</option>
                      <option value="Print & Packaging">Print & Packaging Design</option>
                      <option value="Digital Marketing">Digital & Performance Marketing</option>
                      <option value="Website Design">Website Design</option>
                      <option value="Not sure yet">Not sure yet</option>
                    </select>
                  </div>
                </div>

                {/* Budget Select */}
                <div className="flex flex-col gap-2">
                  <label className="font-body text-sm font-semibold text-secondary uppercase tracking-wider">
                    Budget Range *
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full bg-surface-2 border border-border focus:border-purple focus:ring-1 focus:ring-purple focus:outline-none p-3.5 rounded-none text-sm text-primary font-body cursor-pointer transition-all"
                  >
                    <option value="Under ₹15,000">Under ₹15,000</option>
                    <option value="₹15,000–₹50,000">₹15,000–₹50,000</option>
                    <option value="₹50,000–₹1,00,000">₹50,000–₹1,00,000</option>
                    <option value="₹1,00,000+">₹1,00,000+</option>
                    <option value="Let's discuss">Let's discuss</option>
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className="font-body text-sm font-semibold text-secondary uppercase tracking-wider">
                    Tell us about your project *
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Give us a brief idea of what you're building and what you need."
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-surface-2 border border-border focus:border-purple focus:ring-1 focus:ring-purple focus:outline-none p-3.5 rounded-none text-sm text-primary placeholder-muted font-body transition-all"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-cyber-purple text-center flex items-center justify-center gap-2 py-3.5 px-8 mt-4 cursor-pointer"
                >
                  {loading ? (
                    <span>Transmitting...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Calendly Booking Section */}
      <section className="mt-12 pt-12 max-w-[1000px] mx-auto px-6 text-center">
        <span className="font-body text-sm font-bold text-purple tracking-widest uppercase block mb-4">
          Direct Booking
        </span>
        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-primary leading-tight mb-4 flex items-center justify-center gap-2">
          <Calendar className="w-6 h-6 text-purple" />
          <span>Prefer to Talk First?</span>
        </h2>
        <p className="text-secondary text-base max-w-md mx-auto mb-6">
          Book a free 30-minute discovery call. No pitch — just a real conversation about your brand.
        </p>
        <div className="font-body text-sm text-muted font-semibold uppercase tracking-wider mb-8 flex justify-center gap-4">
          <span>Free</span>
          <span>·</span>
          <span>30 Minutes</span>
          <span>·</span>
          <span>Evenings After 6:30 PM IST</span>
        </div>
        <a
          href="#"
          className="btn-cyber-purple px-8 py-3.5 inline-flex items-center gap-2 cursor-pointer"
        >
          <span>Pick a Time That Works</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </section>
    </div>
  );
}
