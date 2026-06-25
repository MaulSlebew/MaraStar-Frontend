import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL, getProductImage } from "../api/config";
import { formatPrice } from "../utils/format";
import { sizeOptionsFallback } from "../data/constants";

export default function ProductDetailPage({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const [selectedSize, setSelectedSize] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  // Fetch product by ID
  useEffect(() => {
    async function fetchProduct() {
      try {
        setIsLoading(true);
        setFetchError(null);
        const res = await fetch(`${API_BASE_URL}/api/products/${id}`);
        if (!res.ok) throw new Error(`Couldn't load this piece (status ${res.status})`);
        const json = await res.json();
        setProduct(json.data ?? null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (isLoading) {
    return (
      <section className="mx-auto max-w-6xl px-6 md:px-10 py-12">
        <div className="animate-pulse">
          <div className="mb-4 h-4 w-32 bg-zinc-200 rounded" />
          <div className="h-12 w-1/2 bg-zinc-200 rounded mb-12" />
          <div className="grid grid-cols-2 gap-12">
            <div className="aspect-[3/4] bg-zinc-100 rounded" />
            <div className="space-y-4">
              <div className="h-8 w-64 bg-zinc-200 rounded" />
              <div className="h-8 w-32 bg-zinc-200 rounded" />
              <div className="h-20 bg-zinc-100 rounded" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (fetchError || !product) {
    return (
      <section className="mx-auto max-w-6xl px-6 md:px-10 py-12">
        <div className="border border-zinc-200 bg-zinc-50 p-8 text-center rounded">
          <p className="text-sm font-semibold text-zinc-900">This piece doesn't exist anymore.</p>
          <p className="text-xs text-zinc-500 mt-2">{fetchError}</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 inline-block border border-zinc-900 px-6 py-2 text-sm font-semibold uppercase text-zinc-900 hover:bg-zinc-900 hover:text-white transition"
          >
            Back Home
          </button>
        </div>
      </section>
    );
  }

  const sizes = sizeOptionsFallback.map((sizeName, idx) => {
    const productSize = product.sizes?.find((s) => s.nama_ukuran === sizeName);

    return {
      id: productSize?.id ?? `fallback-${idx}`,
      nama_ukuran: sizeName,
      stok: productSize?.pivot?.stok ?? 0,
    };
  });

  const selectedSizeData = sizes.find((s) => s.nama_ukuran === selectedSize);

  const handleAddToCartUtuh = () => {
    if (!selectedSize) return;
    if (selectedSizeData?.stok === 0) return;

    addToCart(product, selectedSize);

    setIsAdding(true);

    setTimeout(() => {
      setIsAdding(false);
    }, 2000);
  };

  return (
    <section className="mx-auto max-w-6xl px-6 md:px-10">
      <button
        onClick={() => navigate(-1)}
        className="mt-8 flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-zinc-500 transition-colors hover:text-zinc-900"
      >
        <span>←</span> Back to Catalog
      </button>

      <div className="grid grid-cols-1 gap-12 py-12 md:grid-cols-2">
        {/* SISI KIRI — FOTO */}
        <div className="relative aspect-[3/4] w-full border border-zinc-200 bg-white p-6">
          <img
            src={getProductImage(product)}
            alt={product.nama_produk}
            className="h-full w-full object-contain"
          />
          {product.category?.nama_kategori && (
            <span className="absolute bottom-4 left-4 border border-zinc-200 bg-zinc-50/90 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-zinc-900 backdrop-blur-sm">
              {product.category.nama_kategori}
            </span>
          )}
        </div>

        {/* SISI KANAN — INFO */}
        <div className="flex flex-col">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-400">
            Boxy 20s Heavyweight
          </p>

          <h1 className="font-display text-3xl font-black uppercase leading-tight tracking-tighter text-zinc-900 md:text-4xl">
            {product.nama_produk}
          </h1>

          <p className="mt-3 text-2xl font-bold text-zinc-900">
            {formatPrice(product.harga)}
          </p>

          <p className="mt-6 max-w-md text-sm leading-relaxed text-zinc-500 md:text-base">
            Made from{" "}
            <span className="font-semibold text-zinc-900">20s heavyweight cotton</span>{" "}
            240 GSM — thick, beefy fabric with that premium drape. <span className="font-semibold text-zinc-900">Boxy fit</span> for everyday wear that actually feels right.
          </p>

          {/* PILIHAN UKURAN */}
          <div className="mt-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-900">
              Size
            </p>
            <div className="grid grid-cols-4 gap-3">
              {sizes.map((sizeItem) => {
                const isOutOfStock = sizeItem.stok === 0;
                const isSelected = selectedSize === sizeItem.nama_ukuran;

                return (
                  <button
                    key={sizeItem.id}
                    onClick={() =>
                      !isOutOfStock &&
                      !isAdding &&
                      setSelectedSize(sizeItem.nama_ukuran)
                    }
                    disabled={isOutOfStock || isAdding}
                    className={`relative border py-3 text-sm font-semibold uppercase tracking-widest transition-colors ${
                      isOutOfStock
                        ? "cursor-not-allowed border-zinc-200 text-zinc-300"
                        : isSelected
                          ? "border-zinc-900 bg-zinc-900 text-zinc-50"
                          : "border-zinc-200 text-zinc-700 hover:border-zinc-900"
                    }`}
                  >
                    {sizeItem.nama_ukuran}

                    {isOutOfStock && (
                      <span className="absolute -top-2 -right-2 rounded-full bg-zinc-900 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-zinc-50">
                        Sold
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {selectedSizeData &&
              typeof selectedSizeData.stok === "number" &&
              selectedSizeData.stok > 0 && (
                <p className="mt-2 text-xs text-zinc-400">
                  {selectedSizeData.nama_ukuran} in stock:{" "}
                  <span className="font-semibold text-zinc-600">
                    {selectedSizeData.stok} left
                  </span>
                </p>
              )}
          </div>

          {/* TOMBOL DENGAN MIKRO ANIMASI PREMIUM */}
          <button
            onClick={handleAddToCartUtuh}
            disabled={!selectedSize || selectedSizeData?.stok === 0 || isAdding}
            className={`mt-10 w-full py-4 text-sm font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 ${
              isAdding
                ? "bg-emerald-600 text-white scale-[0.98]"
                : "bg-zinc-950 text-zinc-50 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
            }`}
          >
            {isAdding ? (
              <>
                <svg
                  className="h-4 w-4 animate-[bounce_0.5s_ease-in-out]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Added!
              </>
            ) : (
              "Add to Bag"
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
