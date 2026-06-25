import React from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";

export default function CatalogSection({
  products,
  isLoading,
  fetchError,
  title,
}) {
  const navigate = useNavigate();
  return (
    <section className="border-b border-zinc-200">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
        {/* HEADER SECTION */}
        <div className="mb-10 flex flex-col gap-3 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-400">
              Product Catalog
            </p>
            <h2 className="font-display text-3xl font-black uppercase tracking-tighter text-zinc-900 md:text-4xl">
              {title || "The Boxy Series"}
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-zinc-500">
            Same cotton. Different cuts. Pick your weapon.
          </p>
        </div>

        {/* STATE: LOADING (Skeleton) */}
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
              Couldn't load the drops.
            </p>
            <p className="mt-1 text-xs text-zinc-400">{fetchError}</p>
          </div>
        )}

        {/* STATE: EMPTY */}
        {!isLoading && !fetchError && products.length === 0 && (
          <div className="border border-zinc-200 bg-zinc-100 px-6 py-10 text-center">
            <p className="text-sm font-semibold text-zinc-700">
              No drops here yet. Stay tuned.
            </p>
          </div>
        )}

        {/* GRID PRODUK */}
        {!isLoading && !fetchError && products.length > 0 && (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={() => navigate(`/product/${product.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
