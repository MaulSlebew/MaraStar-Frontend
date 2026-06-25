import React from "react";
import { formatPrice } from "../utils/format";

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  removeFromCart,
}) {
  // 1. Hitung total harga belanjaan
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + (Number(item.harga) || 0) * item.jumlah,
    0,
  );

  // ==========================================
  // BERSIAP BELAJAR LOGIC CHECKOUT WA DISINI:
  // ==========================================
  const handleCheckoutWhatsApp = () => {
    // A. Tentukan nomor WA admin BLABLABLA (Ganti pake nomor kamu, diawali 62 ya, bukan 0)
    const nomorWhatsApp = "6285849107128";

    // B. Rangkai teks pembuka awal chat
    let templatePesan = "Halo BLABLABLA, saya mau order item berikut:\n\n";

    // C. LOOPING (Putar) isi keranjang: Ambil tiap produk, susun jadi teks list
    cartItems.forEach((item, index) => {
      templatePesan += `*${index + 1}. ${item.nama_produk}*\n`;
      templatePesan += `- Ukuran: ${item.ukuran}\n`;
      templatePesan += `- Jumlah: ${item.jumlah} pcs\n`;
      templatePesan += `- Harga: ${formatPrice(item.harga * item.jumlah)}\n\n`;
    });

    // D. Tambahkan total pembayaran di akhir chat
    templatePesan += `*Total Pembayaran:* ${formatPrice(totalPrice)}\n\n`;
    templatePesan +=
      "Mohon info ketersediaan barang dan instruksi pembayaran selanjutnya ya, min. Thanks!";

    // E. SULAP JAVASCRIPT: Ubah spasi & enter jadi format aman URL
    const pesanAmanUrl = encodeURIComponent(templatePesan);

    // F. EKSEKUSI: Buka link WhatsApp resmi di tab baru browser!
    const linkFinalWA = `https://wa.me/${nomorWhatsApp}?text=${pesanAmanUrl}`;
    window.open(linkFinalWA, "_blank");
  };
  // ==========================================

  return (
    <>
      {/* BLACK OVERLAY */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* SLIDE-IN PANEL */}
      <aside
        className={`fixed right-0 top-0 z-[110] h-full w-full max-w-md border-l border-zinc-200 bg-zinc-50 p-6 shadow-2xl transition-transform duration-500 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* HEADER PANEL */}
        <div className="flex items-center justify-between border-b border-zinc-200 pb-5">
          <h2 className="font-display text-lg font-black uppercase tracking-[-0.05em] text-zinc-900">
            Your Bag{" "}
            <span className="text-zinc-400">({cartItems.length})</span>
          </h2>
          <button
            onClick={onClose}
            className="text-sm font-semibold uppercase tracking-widest text-zinc-500 hover:text-zinc-900"
          >
            Close [×]
          </button>
        </div>

        {/* LIST PRODUK */}
        <div className="flex-grow overflow-y-auto py-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="py-16 text-center border-2 border-dashed border-zinc-200 bg-zinc-100">
              <p className="text-sm text-zinc-500 uppercase tracking-widest">
                Your bag's looking light.
              </p>
              <p className="mt-2 text-xs text-zinc-400">
                Time to add some heat.
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={`${item.id}-${item.ukuran}`}
                className="flex items-start gap-4 pb-4 border-b border-zinc-200"
              >
                {/* Visual Produk */}
                <div className="aspect-[3/4] w-20 flex-shrink-0 border border-zinc-200 bg-white p-2">
                  {/* Gunakan fallback aman untuk url gambar */}
                  <img
                    src={
                      item.gambar ||
                      "https://placehold.co/800x1000?text=NO+IMAGE"
                    }
                    alt={item.nama_produk}
                    className="h-full w-full object-contain"
                  />
                </div>

                {/* Info Produk */}
                <div className="flex-grow">
                  <p className="text-[11px] uppercase tracking-widest text-zinc-400">
                    {item.ukuran}
                  </p>
                  <h4 className="mt-1 text-sm font-semibold text-zinc-900">
                    {item.nama_produk}
                  </h4>
                  <p className="mt-1 text-sm font-bold text-zinc-950">
                    {formatPrice(item.harga)}
                  </p>
                  <div className="mt-3 text-xs text-zinc-600">
                    Qty:{" "}
                    <span className="font-semibold text-zinc-800">
                      {item.jumlah} pcs
                    </span>
                  </div>
                </div>

                {/* Hapus Item */}
                <button
                  onClick={() => removeFromCart(item.id, item.ukuran)}
                  className="text-zinc-400 hover:text-red-600 p-1"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* SUB-TOTAL & TOMBOL CHECKOUT */}
        <div className="border-t border-zinc-200 pt-6 mt-auto">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm font-medium uppercase tracking-widest text-zinc-600">
              Sub-total
            </span>
            <span className="text-2xl font-black text-zinc-950">
              {formatPrice(totalPrice)}
            </span>
          </div>

          {/* HUBUNGKAN TOMBOL KE FUNGSI CHECKOUT DI ATAS */}
          <button
            onClick={handleCheckoutWhatsApp} // <--- KITA PASANG DISINI
            disabled={cartItems.length === 0}
            className="w-full bg-zinc-950 py-4 text-sm font-bold uppercase tracking-widest text-zinc-50 transition-colors hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            Lanjut ke Checkout (WA)
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>

          <p className="mt-3 text-[11px] text-zinc-400 text-center uppercase tracking-wider">
            Checkout via WhatsApp, CS BLABLABLA Siap Bantu.
          </p>
        </div>
      </aside>
    </>
  );
}
