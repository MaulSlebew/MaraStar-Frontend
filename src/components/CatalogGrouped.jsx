import React from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";

const CATEGORY_GROUPS = [
  {
    label: "Boxy Fit 20s",
    value: "boxy",
    slug: "boxy-20s",
    description:
      "Wide shoulders, straight vibes. The classic.",
  },
  {
    label: "Oversize Boxy 20s",
    value: "oversize",
    slug: "oversize-20s",
    description:
      "Go bigger. Same heavy fabric, different attitude.",
  },
  {
    label: "Fitted Tee",
    value: "fitted",
    slug: "fitted-tee",
    description:
      "Slim. Sharp. Zero fluff.",
  },
  {
    label: "Hoodie Boxy",
    value: "hoodie-boxy",
    slug: "hoodie-boxy",
    description:
      "Cozy fit, premium feel. Layer up.",
  },
];

export default function CatalogGrouped({
  products,
  isLoading,
  fetchError,
}) {
  const navigate = useNavigate();

  const getProductsByCategory = (categorySlug) =>
    products
      .filter((p) => p.category?.slug === categorySlug)
      .slice(0, 4);

  return (
    <section className="border-b border-zinc-200">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24 flex flex-col gap-20">
        {/* STATE: LOADING */}
        {isLoading && (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col gap-4">
                <div className="aspect-[3/4] w-full animate-pulse border border-zinc-200/60 bg-zinc-100" />
                <div className="h-3 w-3/4 animate-pulse bg-zinc-100" />
                <div className="h-3 w-1/2 animate-pulse bg-zinc-100" />
              </div>
            ))}
          </div>
        )}

        {/* STATE: ERROR */}
        {!isLoading && fetchError && (
          <div className="border border-zinc-200 bg-zinc-100 px-6 py-10 text-center">
            <p className="text-sm font-semibold text-zinc-700">
              Gagal memuat produk.
            </p>
            <p className="mt-1 text-xs text-zinc-400">{fetchError}</p>
          </div>
        )}

        {/* GROUPED SECTIONS */}
        {!isLoading &&
          !fetchError &&
          CATEGORY_GROUPS.map((cat) => {
            const groupProducts = getProductsByCategory(cat.slug);
            if (groupProducts.length === 0) return null;

            return (
              <div key={cat.value}>
                {/* GROUP HEADER */}
                <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-400">
                      Product Catalog
                    </p>
                    <h2 className="font-display text-3xl font-black uppercase tracking-tighter text-zinc-900 md:text-4xl">
                      {cat.label}
                    </h2>
                  </div>
                  <p className="max-w-xs text-sm leading-relaxed text-zinc-500">
                    {cat.description}
                  </p>
                </div>

                {/* GRID 4 CARD */}
                <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
                  {groupProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onSelect={() => navigate(`/product/${product.id}`)}
                    />
                  ))}
                </div>

                {/* TOMBOL LIHAT SEMUA */}
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => navigate(`/shop?category=${cat.value}`)}
                    className="group flex items-center gap-2 border border-zinc-900 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-900 transition-all hover:bg-zinc-900 hover:text-white"
                  >
                    See all {cat.label}
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
}
