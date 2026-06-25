import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import CatalogSection from "../components/CatalogSection";

const CATEGORY_MAP = {
  "boxy": { name: "Boxy FIT 20S", slugs: ["boxy-20s"] },
  "oversize": { name: "OVERSIZE BOXY 20S", slugs: ["oversize-20s"] },
  "fitted": { name: "FITTED TEE", slugs: ["fitted-tee"] },
  "hoodie": { name: "HOODIE", slugs: ["hoodie"] },
  "hoodie-boxy": { name: "HOODIE BOXY", slugs: ["hoodie-boxy"] },
};

export default function ShopPage({
  products,
  isLoading,
  fetchError,
}) {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");

  const filteredProducts = useMemo(() => {
    if (!categoryFilter || categoryFilter === "null") {
      return products;
    }

    const categoryConfig = CATEGORY_MAP[categoryFilter];
    if (!categoryConfig) {
      return products;
    }

    return products.filter((product) => {
      if (!product.category) return false;
      return categoryConfig.slugs.includes(product.category.slug);
    });
  }, [products, categoryFilter]);

  const categoryName = categoryFilter && CATEGORY_MAP[categoryFilter] 
    ? CATEGORY_MAP[categoryFilter].name
    : "The Boxy Series";

  return (
    <div className="py-6">
      <CatalogSection
        products={filteredProducts}
        isLoading={isLoading}
        fetchError={fetchError}
        title={categoryName}
      />
    </div>
  );
}
