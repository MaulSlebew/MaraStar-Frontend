import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-zinc-200 bg-zinc-50 pt-16 pb-8 text-zinc-900 selection:bg-zinc-900 selection:text-zinc-50">
      {/* SECTION ATAS — GRID MULTI KOLOM (Sesuai Kith Layout) */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 pb-16 sm:grid-cols-2 md:grid-cols-5 md:px-10">
        
        {/* KOLOM 1: JOIN OUR LIST (NEWSLETTER KAKU STYLISH) */}
        <div className="md:col-span-1">
          <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-900">
            Join Our List
          </h4>
          <p className="mt-3 text-[11px] leading-relaxed text-zinc-500 uppercase tracking-wider">
            DON'T SLEEP ON THE NEXT DROP.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="mt-4 flex max-w-xs">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full border border-zinc-300 bg-white px-3 py-2 text-xs uppercase tracking-wider text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-900"
            />
            <button
              type="submit"
              className="bg-zinc-950 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-50 transition-colors hover:bg-zinc-800"
            >
              Submit
            </button>
          </form>
        </div>

        {/* KOLOM 2: LEARN */}
        <div>
          <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-900">
            Learn
          </h4>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link
                to="/about"
                className="text-[11px] font-medium uppercase tracking-widest text-zinc-500 transition-colors hover:text-zinc-900"
              >
                About Us
              </Link>
            </li>
            <li>
              <a href="#faqs" className="text-[11px] font-medium uppercase tracking-widest text-zinc-500 transition-colors hover:text-zinc-900">
                FAQs
              </a>
            </li>
            <li>
              <Link
                to="/sizechart"
                className="text-[11px] font-medium uppercase tracking-widest text-zinc-500 transition-colors hover:text-zinc-900"
              >
                Size Chart
              </Link>
            </li>
          </ul>
        </div>

        {/* KOLOM 3: BRAND IDENTITY (ASSPELTHREE) */}
        <div>
          <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-900">
            Blablabla
          </h4>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a href="#discover" className="text-[11px] font-medium uppercase tracking-widest text-zinc-500 transition-colors hover:text-zinc-900">
                Discover
              </a>
            </li>
            <li>
              <a href="#syndicate" className="text-[11px] font-medium uppercase tracking-widest text-zinc-500 transition-colors hover:text-zinc-900">
                Syndicate
              </a>
            </li>
            <li>
              <a href="#contact" className="text-[11px] font-medium uppercase tracking-widest text-zinc-500 transition-colors hover:text-zinc-900">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* KOLOM 4: POLICIES */}
        <div>
          <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-900">
            Policies
          </h4>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a href="#terms" className="text-[11px] font-medium uppercase tracking-widest text-zinc-500 transition-colors hover:text-zinc-900">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#privacy" className="text-[11px] font-medium uppercase tracking-widest text-zinc-500 transition-colors hover:text-zinc-900">
                Privacy Statement
              </a>
            </li>
            <li>
              <a href="#shipping" className="text-[11px] font-medium uppercase tracking-widest text-zinc-500 transition-colors hover:text-zinc-900">
                Shipping & Returns
              </a>
            </li>
          </ul>
        </div>

        {/* KOLOM 5: FOLLOW US */}
        <div>
          <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-900">
            Follow Us
          </h4>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-[11px] font-medium uppercase tracking-widest text-zinc-500 transition-colors hover:text-zinc-900">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="text-[11px] font-medium uppercase tracking-widest text-zinc-500 transition-colors hover:text-zinc-900">
                TikTok
              </a>
            </li>
            <li>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-[11px] font-medium uppercase tracking-widest text-zinc-500 transition-colors hover:text-zinc-900">
                YouTube
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* SECTION BAWAH — COPYRIGHT LINE (Persis Layout Bawah Kith di image_824f02.jpg) */}
      <div className="mx-auto max-w-6xl border-t border-zinc-200 px-6 pt-8 md:px-10">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          
          {/* SISI KIRI: COPYRIGHT */}
          <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-400">
            © {currentYear} Farid Maulana Rhamadan.
          </div>

          {/* SISI TENGAH: BRAND IDENTITY BRANDING SLOGAN */}
          <div className="text-center text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400 max-w-md hidden md:block">
            "Real recognize real. Loyalty is royalty."
          </div>

          {/* SISI KANAN: SELECT SITE / CURRENCY SIMULATION */}
          <div className="flex items-center gap-4 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
            <span>SITE: ID / RP</span>
            <span className="h-3 w-px bg-zinc-300" />
            <span className="text-zinc-900 font-bold">THE ONE AND ONLY</span>
          </div>

        </div>
      </div>
    </footer>
  );
}