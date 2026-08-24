import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';

export default function HeroDemo() {
  const [variant, setVariant] = useState('sydecar'); // 'sydecar' | 'wealthwisdom'

  return (
    <div className="min-h-screen bg-[#E8DFD0]">
      {/* Floating Mode Toggle Bar for Testing */}
      <div className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-zinc-200 shadow-lg flex items-center gap-3 text-xs font-medium">
        <span className="text-zinc-500">Preset Copy:</span>
        <button
          type="button"
          onClick={() => setVariant('sydecar')}
          className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
            variant === 'sydecar'
              ? 'bg-[#0D2B26] text-white shadow-xs font-semibold'
              : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
          }`}
        >
          Reference Image (Sydecar)
        </button>
        <button
          type="button"
          onClick={() => setVariant('wealthwisdom')}
          className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
            variant === 'wealthwisdom'
              ? 'bg-[#0D2B26] text-white shadow-xs font-semibold'
              : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
          }`}
        >
          Wealth Wisdom Copy
        </button>
      </div>

      {variant === 'sydecar' ? (
        <HeroSection
          logoText="Sydecar"
          badgeText="$38B+ assets administered • 50% cost savings • 12x faster to market"
          headlineLine1="Launch Investment"
          headlineLine2="Vehicles Instantly"
          subheading="Sydecar powers SPVs and funds for leading investors, helping them launch, scale, and close deals faster."
          emailPlaceholder="Your work email"
          ctaText="Request a Demo"
          signInText="Sign in"
          navItems={[
            { label: "Products", hasDropdown: true, href: "#products" },
            { label: "Solutions", hasDropdown: true, href: "#solutions" },
            { label: "Resources", hasDropdown: true, href: "#resources" },
            { label: "Company", hasDropdown: true, href: "#company" },
            { label: "Pricing", hasDropdown: false, href: "#pricing" },
          ]}
        />
      ) : (
        <HeroSection
          logoText="Wealth Wisdom"
          badgeText="₹500Cr+ Assets Planned • 100% Conflict-Free • Instant DIY Plan"
          headlineLine1="Turn Your Dreams Into"
          headlineLine2="Achievable Goals"
          subheading="Achieve your aspirations with a flexible framework built for multiple goals, different timelines, and smarter planning."
          emailPlaceholder="Enter your email"
          ctaText="Start Free DIY Plan"
          signInText="Sign in"
          navItems={[
            { label: "Services", hasDropdown: true, href: "/#services" },
            { label: "Solutions", hasDropdown: true, href: "/#solutions" },
            { label: "Resources", hasDropdown: true, href: "/#resources" },
            { label: "About Us", hasDropdown: false, href: "/#about" },
            { label: "Testimonials", hasDropdown: false, href: "/#testimonials" },
          ]}
        />
      )}
    </div>
  );
}
