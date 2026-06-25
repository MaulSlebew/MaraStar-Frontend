import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useSearchParams } from "react-router-dom";
import { API_PRODUCTS_URL } from "./api/config";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import SizeChartPage from "./pages/SizeChartPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartDrawer from "./components/CartDrawer";

const loadCartFromStorage = () => {
  try {
    const serializedCart = localStorage.getItem("blablablaCart");
    if (serializedCart === null) return [];
    return JSON.parse(serializedCart);
  } catch (err) {
    console.error("Gagal memuat keranjang:", err);
    return [];
  }
};

function AppContent() {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // --- LOGIC KERANJANG ---
  const [cartItems, setCartItems] = useState(loadCartFromStorage);

  useEffect(() => {
    localStorage.setItem("blablablaCart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, size) => {
    if (!size) return;
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === product.id && item.ukuran === size,
      );
      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          jumlah: newItems[existingItemIndex].jumlah + 1,
        };
        return newItems;
      } else {
        const newItem = {
          id: product.id,
          nama_produk: product.nama_produk,
          harga: product.harga,
          ukuran: size,
          gambar: product.images?.[0]?.image_url ? `${new URL(API_PRODUCTS_URL).origin}/storage/${product.images[0].image_url}` : null,
          jumlah: 1,
        };
        return [...prevItems, newItem];
      }
    });
  };

  const removeFromCart = (idToRemove, sizeToRemove) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => item.id !== idToRemove || item.ukuran !== sizeToRemove,
      ),
    );
  };

  // --- FETCH DATA PRODUK ---
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchProducts() {
      try {
        setIsLoading(true);
        setFetchError(null);
        const res = await fetch(API_PRODUCTS_URL);
        if (!res.ok) throw new Error(`Gagal (status ${res.status})`);
        const json = await res.json();
        const data = json?.data ?? [];
        if (isMounted) setProducts(data);
      } catch (err) {
        if (isMounted) setFetchError(err.message);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    fetchProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans antialiased selection:bg-zinc-900 selection:text-zinc-50">
      <Navbar
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        isCategoryOpen={isCategoryOpen}
        setIsCategoryOpen={setIsCategoryOpen}
      />

      <main
        style={{ filter: isCategoryOpen ? "blur(2.5px)" : "none" }}
        className={`transition-all duration-300 ${isCategoryOpen ? "pointer-events-none opacity-80" : ""}`}
      >
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage
                products={products}
                isLoading={isLoading}
                fetchError={fetchError}
              />
            } 
          />
          <Route 
            path="/shop" 
            element={
              <ShopPage
                products={products}
                isLoading={isLoading}
                fetchError={fetchError}
              />
            } 
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/sizechart" element={<SizeChartPage />} />
          <Route 
            path="/product/:id" 
            element={<ProductDetailPage addToCart={addToCart} />} 
          />
        </Routes>
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
      />

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
