import React from "react";
import { useNavigate } from "react-router-dom";
import { STORAGE_URL } from "../api/config";

export default function HeroSection({ products }) {
  const navigate = useNavigate();
  const heroProduct = products?.[0];
  const FALLBACK_IMAGE =
    "https://placehold.co/800x1000/e4e4e7/a1a1aa?text=NO+IMAGE";

  const formatPriceLocal = (value) => {
    const number = Number(value) || 0;
    return `Rp${number.toLocaleString("id-ID")}`;
  };

  const getProductImageLocal = (prod) => {
    if (prod?.images && prod.images.length > 0 && prod.images[0]?.image_url) {
      return `${STORAGE_URL}${prod.images[0].image_url}`;
    }
    return FALLBACK_IMAGE;
  };

  return (
    <section className="relative overflow-hidden border-b border-zinc-200">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-16 md:grid-cols-2 md:px-10 md:py-24">
        {/* KOLOM KIRI — COPY */}
        <div className="order-2 md:order-1">
          <div className="mb-6 inline-flex items-center gap-2 border border-zinc-300 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-900" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Single Drop — 20s Heavyweight
            </span>
          </div>

          <h1 className="font-display text-5xl font-black uppercase leading-[0.95] tracking-tighter text-zinc-900 md:text-7xl">
            HEAVY IS THE 
            <br />
            ONLY WAY.
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-zinc-500 md:text-lg">
            <span className="font-semibold text-zinc-900">240 GSM</span>{" "}
            Boxy cut. No soft shit. Built for those who move different.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigate("/shop")}
              className="bg-zinc-950 px-8 py-4 text-sm font-bold uppercase tracking-widest text-zinc-50 transition-colors hover:bg-zinc-800"
            >
              GET YOURS
            </button>
            <button
              onClick={() => navigate("/shop")}
              className="border border-zinc-900 px-8 py-4 text-sm font-bold uppercase tracking-widest text-zinc-900 transition-colors hover:bg-zinc-900 hover:text-zinc-50"
            >
              SEE THE LINEUP
            </button>
          </div>

          <div className="mt-12 flex items-center gap-8 border-t border-zinc-200 pt-6">
            <div>
              <p className="font-display text-2xl font-black text-zinc-900">
                240
              </p>
              <p className="text-[11px] uppercase tracking-widest text-zinc-400">
                GSM Heavyweight
              </p>
            </div>
            <div className="h-8 w-px bg-zinc-200" />
            <div>
              <p className="font-display text-2xl font-black text-zinc-900">
                Boxy
              </p>
              <p className="text-[11px] uppercase tracking-widest text-zinc-400">
                Oversized Cut
              </p>
            </div>
            <div className="h-8 w-px bg-zinc-200" />
            <div>
              <p className="font-display text-2xl font-black text-zinc-900">
                100%
              </p>
              <p className="text-[11px] uppercase tracking-widest text-zinc-400">
                Combed Cotton
              </p>
            </div>
          </div>
        </div>

        {/* KOLOM KANAN — VISUAL */}
        <div className="order-1 md:order-2">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md border border-zinc-200 bg-white p-4">
            <img
              src={getProductImageLocal(heroProduct)}
              alt={heroProduct?.nama_produk || "Produk"}
              className="h-full w-full object-contain"
            />
            {heroProduct && (
              <div className="absolute bottom-4 left-4 border border-zinc-200 bg-zinc-50/90 px-3 py-2 backdrop-blur-sm">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-900">
                  {heroProduct.category?.nama_kategori ||
                    heroProduct.nama_produk}
                </p>
                <p className="text-[11px] text-zinc-500">
                  {formatPriceLocal(heroProduct.harga)}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}