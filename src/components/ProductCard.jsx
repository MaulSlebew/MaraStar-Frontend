import React from "react";

export default function ProductCard({ product, onSelect }) {
  // Fallback url jika gambar kosong atau bermasalah
  const FALLBACK_IMAGE =
    "https://placehold.co/800x1000/e4e4e7/a1a1aa?text=NO+IMAGE";
  const STORAGE_URL = "http://127.0.0.1:8000/storage/";

  // Helper local (sementara sebelum utilitas dipisah)
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

  const tagLabel = product.category?.nama_kategori || "Heavyweight";

  return (
    <button onClick={onSelect} className="group flex flex-col text-left w-full">
      {/* FOTO PRODUK */}
      {/* Mengubah bg-zinc-100 menjadi bg-white dan menambahkan padding p-4 */}
      <div className="relative aspect-[3/4] w-full overflow-hidden border border-zinc-200/60 bg-white p-4 transition-colors duration-300 group-hover:border-zinc-400">
        <img
          src={getProductImageLocal(product)}
          alt={product.nama_produk}

          className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.06]"
        />

        {/* TAG KATEGORI — pojok kiri atas */}
        <span className="absolute left-3 top-3 border border-zinc-200/80 bg-zinc-50/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-700 backdrop-blur-sm">
          {tagLabel}
        </span>

        {/* OVERLAY CTA — muncul saat hover */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-zinc-950/90 px-3 py-2.5 text-center text-[11px] font-bold uppercase tracking-widest text-zinc-50 transition-transform duration-300 ease-out group-hover:translate-y-0">
          Get the Deets
        </div>
      </div>

      {/* INFO PRODUK */}
      <div className="mt-4 flex flex-col gap-1">
        <h3 className="text-sm font-semibold leading-snug text-zinc-900 md:text-base">
          {product.nama_produk}
        </h3>
        <p className="text-xs uppercase tracking-widest text-zinc-400">
          {tagLabel}
        </p>
        <p className="mt-1 text-sm font-bold text-zinc-900">
          {formatPriceLocal(product.harga)}
        </p>
      </div>
    </button>
  );
}