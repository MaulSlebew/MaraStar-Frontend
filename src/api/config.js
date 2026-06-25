// Pastikan pakai https:// dan hilangkan /api di baris pertama ini
export const API_BASE_URL = "https://dashboard-blablablacloth.up.railway.app"; 

// Baru di baris ini kita arahkan ke /api/products
export const API_PRODUCTS_URL = `${API_BASE_URL}/api/products`;
export const STORAGE_URL = `${API_BASE_URL}/storage/`;

export const FALLBACK_IMAGE = "https://placehold.co/800x1000/e4e4e7/a1a1aa?text=NO+IMAGE";

export function getProductImage(product) {
  if (product?.images && product.images.length > 0 && product.images[0]?.image_url) {
    return `${STORAGE_URL}${product.images[0].image_url}`;
  }
  return FALLBACK_IMAGE;
}