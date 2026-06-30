import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-6 text-center font-sans">
      <div className="max-w-md space-y-6">
        <h1 className="text-6xl font-heading font-black text-[#1E2B49]">404</h1>
        <h2 className="text-xl font-bold text-slate-800">Page Not Found</h2>
        <p className="text-sm text-slate-500 font-light leading-relaxed">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#ED8B36] hover:bg-[#E56A1F] text-white px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-md cursor-pointer"
        >
          &larr; Back to Home
        </Link>
      </div>
    </div>
  );
}
