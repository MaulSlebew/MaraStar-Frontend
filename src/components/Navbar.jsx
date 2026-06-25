import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({
  cartItems,
  onOpenCart,
  isCategoryOpen,
  setIsCategoryOpen,
}) {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalItemsInCart = cartItems.reduce(
    (acc, item) => acc + item.jumlah,
    0,
  );

  const categories = [
    { id: "all", label: "ALL DROPS", value: null },
    { id: "boxy", label: "BOXY FIT 20S", value: "boxy" },
    { id: "oversize", label: "OVERSIZE BOXY 20S", value: "oversize" },
    { id: "fitted", label: "FITTED TEE", value: "fitted" },
    { id: "hoodie-boxy", label: "HOODIE BOXY", value: "hoodie-boxy" },
  ];

  const handleCategorySelect = (categoryValue) => {
    setIsCategoryOpen(false);
    setIsMobileMenuOpen(false);
    if (categoryValue === null) {
      navigate("/shop");
    } else {
      navigate(`/shop?category=${categoryValue}`);
    }
  };

  const handleNavClick = () => {
    setIsCategoryOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* OVERLAY CLICKABLE */}
      {(isCategoryOpen || isMobileMenuOpen) && (
        <div
          onClick={() => {
            setIsCategoryOpen(false);
            setIsMobileMenuOpen(false);
          }}
          className="fixed inset-0 z-40 bg-zinc-950/10 transition-opacity duration-300"
        />
      )}

      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-zinc-50/95 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
          {/* LOGO */}
          <Link 
            to="/"
            className="flex items-center"
            onClick={handleNavClick}
          >
            <span className="font-display text-lg font-black uppercase tracking-[-0.08em] text-zinc-900 md:text-xl">
              blablabla<span className="text-[10px] text-zinc-400">®</span>
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-1 relative">
            {/* LINK HOME */}
            <Link
              to="/"
              className="px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] transition-colors text-zinc-500 hover:text-zinc-900"
              onClick={handleNavClick}
            >
              Home
            </Link>

            {/* TOMBOL DROPDOWN KATEGORI */}
            <button
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] transition-all flex items-center gap-1 duration-200 ${
                isCategoryOpen
                  ? "bg-zinc-950 text-zinc-50 scale-105"
                  : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              Category 
            </button>

            {/* LINK ABOUT */}
            <Link
              to="/about"
              className="px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] transition-colors text-zinc-500 hover:text-zinc-900"
              onClick={handleNavClick}
            >
              About
            </Link>

            {/* LINK CONTACT */}
            <Link
              to="/contact"
              className="px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] transition-colors text-zinc-500 hover:text-zinc-900"
              onClick={handleNavClick}
            >
              Contact
            </Link>

            {/* DROPDOWN BOX */}
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-zinc-950 text-zinc-50 border border-zinc-800 shadow-2xl transition-all duration-300 transform origin-top ${
                isCategoryOpen
                  ? "opacity-100 scale-100 visible"
                  : "opacity-0 scale-95 invisible pointer-events-none"
              }`}
            >
              <div className="flex flex-col p-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.value)}
                    className="w-full text-left px-4 py-3.5 text-[11px] font-black uppercase tracking-[0.15em] transition-colors border-b border-zinc-900 last:border-0 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-50"
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - HAMBURGER + CART */}
          <div className="flex items-center gap-4">
            {/* MOBILE HAMBURGER MENU */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex flex-col gap-1.5 w-6 h-6 relative group"
            >
              <span className={`w-full h-0.5 bg-zinc-900 transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`w-full h-0.5 bg-zinc-900 transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`w-full h-0.5 bg-zinc-900 transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>

            {/* CART SISI KANAN */}
            <button
              onClick={() => {
                setIsCategoryOpen(false);
                setIsMobileMenuOpen(false);
                onOpenCart();
              }}
              className="relative flex items-center gap-2 group"
            >
              <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-600 transition-colors group-hover:text-zinc-950">
                Cart
              </span>
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 transition-colors group-hover:bg-zinc-700">
                <span className="font-display text-[10px] font-bold text-zinc-50">
                  {totalItemsInCart}
                </span>
              </div>
            </button>
          </div>
        </nav>

        {/* MOBILE MENU */}
        <div
          className={`md:hidden bg-zinc-50 border-t border-zinc-200 transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className="px-6 py-4 flex flex-col gap-1">
            {/* MOBILE HOME LINK */}
            <Link
              to="/"
              className="py-3 px-4 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded transition-colors"
              onClick={handleNavClick}
            >
              Home
            </Link>

            {/* MOBILE CATEGORIES */}
            <button
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className={`py-3 px-4 text-sm font-semibold uppercase tracking-[0.2em] text-left rounded transition-colors ${
                isCategoryOpen
                  ? "bg-zinc-900 text-zinc-50"
                  : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
              }`}
            >
              Category
            </button>

            {/* MOBILE CATEGORY DROPDOWN */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isCategoryOpen ? "max-h-80" : "max-h-0"
              }`}
            >
              <div className="flex flex-col gap-1 pl-4 pt-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.value)}
                    className="py-2.5 px-3 text-xs font-black uppercase tracking-[0.15em] text-left text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded transition-colors"
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* MOBILE ABOUT LINK */}
            <Link
              to="/about"
              className="py-3 px-4 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded transition-colors"
              onClick={handleNavClick}
            >
              About
            </Link>

            {/* MOBILE CONTACT LINK */}
            <Link
              to="/contact"
              className="py-3 px-4 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded transition-colors"
              onClick={handleNavClick}
            >
              Contact
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
