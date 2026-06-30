import React from "react";

export function Footer() {
  return (
    <footer className="bg-transparent py-10 mt-auto flex flex-col items-center">
      <div className="max-w-7xl mx-auto w-full px-4 text-center flex flex-col items-center gap-6">
        
        {/* Secure Message */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-[#A69E90] font-semibold select-none">
          <svg className="w-4 h-4 text-[#A69E90]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Your information is always secure.</span>
        </div>

        {/* Horizontal Divider Line */}
        <div className="w-full h-[1px] bg-[#E5E2DA]" />

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs sm:text-sm font-semibold text-[#8E8A80]">
          <a href="#careers" className="hover:text-[#ED8B36] transition-colors">Careers</a>
          <a href="#legal" className="hover:text-[#ED8B36] transition-colors">Legal</a>
          <a href="#contact" className="hover:text-[#ED8B36] transition-colors">Contact</a>
          <a href="#privacy" className="hover:text-[#ED8B36] transition-colors">Privacy Policy</a>
          <a href="#blog" className="hover:text-[#ED8B36] transition-colors">Blog</a>
          <a href="#faqs" className="hover:text-[#ED8B36] transition-colors">FAQs</a>
        </div>

        {/* Copyright */}
        <p className="text-[11px] sm:text-xs text-[#A69E90] font-medium tracking-wide mt-2">
          &copy; 2026 Wealth Wisdom
        </p>

      </div>
    </footer>
  );
}
