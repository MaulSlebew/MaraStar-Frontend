import React from "react";
import HeroSection from "../components/HeroSection";
import CatalogGrouped from "../components/CatalogGrouped";

export default function HomePage({
  products,
  isLoading,
  fetchError,
}) {
  return (
    <>
      <HeroSection products={products} />
      <CatalogGrouped
        products={products}
        isLoading={isLoading}
        fetchError={fetchError}
      />
    </>
  );
}
