import { useState } from "react";
import { loadProducts } from "../products.server";
import { ProductCard } from "../components/ProductCard";
import type { Route } from "./+types/_index";

export async function loader() {
  const products = await loadProducts();
  return { products };
}

export default function HomePage({ loaderData }: Route.ComponentProps) {
  const { products } = loaderData;
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = filter === "All" ? products : products.filter((p) => p.category === filter);

  const featuredProduct = filteredProducts[0];
  const gridProducts = filteredProducts.slice(1);

  return (
    <div className="pb-20">
      {/* Hero Header */}
      <section className="bg-white pt-24 pb-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-7xl font-semibold tracking-tighter text-[#1D1D1F] mb-6 leading-[1.1]">
            Tools for <br className="hidden sm:block" />
            <span className="text-[#6e6e73]">What's Next.</span>
          </h1>
          <p className="text-xl sm:text-2xl text-[#86868b] max-w-2xl mx-auto leading-relaxed font-normal tracking-tight">
            The Lumina internal ecosystem. <br className="hidden sm:block" /> Empowering
            teams to build the future.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-12 z-40 bg-[#F5F5F7]/80 backdrop-blur-md border-b border-gray-200/50 py-3 px-4 overflow-x-auto no-scrollbar transition-all duration-300">
        <div className="max-w-7xl mx-auto flex justify-center space-x-1 min-w-max">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 ${
                filter === cat
                  ? "bg-[#1D1D1F] text-white shadow-sm"
                  : "text-[#424245] hover:bg-white hover:text-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.length > 0 && (
            <ProductCard product={featuredProduct} featured={true} />
          )}
          {gridProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-32">
            <p className="text-gray-400 text-lg font-light">
              No products available in this category.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
