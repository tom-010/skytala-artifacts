import { Link } from "react-router";
import type { Product } from "../types";
import { ArrowUpRight } from "lucide-react";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export function ProductCard({ product, featured = false }: ProductCardProps) {
  if (featured) {
    return (
      <Link
        to={`/products/${product.id}`}
        className="group relative block w-full overflow-hidden rounded-[24px] bg-white shadow-sm hover:shadow-2xl transition-all duration-500 ease-out transform hover:scale-[1.01] h-[500px] md:h-[640px] col-span-1 md:col-span-2 lg:col-span-2"
      >
        <div className="absolute inset-0 z-10 flex flex-col p-8 md:p-14 justify-end bg-gradient-to-t from-black/50 via-black/10 to-transparent text-white">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-white/80 mb-3">
            {product.category}
          </span>
          <h3 className="text-4xl md:text-5xl font-semibold mb-3 tracking-tight text-white">
            {product.title}
          </h3>
          <p className="text-lg md:text-xl text-white/90 max-w-lg leading-snug">
            {product.tagline}
          </p>
        </div>
        <img
          src={product.heroImage}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </Link>
    );
  }

  return (
    <Link
      to={`/products/${product.id}`}
      className="group flex flex-col bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-1 h-[420px]"
    >
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <img
          src={product.heroImage}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-90 group-hover:scale-100">
          <ArrowUpRight size={14} className="text-black" />
        </div>
      </div>
      <div className="flex-1 p-7 flex flex-col justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 mb-2 block">
            {product.category}
          </span>
          <h3 className="text-[19px] font-semibold text-[#1D1D1F] mb-2 tracking-tight">
            {product.title}
          </h3>
          <p className="text-[13px] leading-relaxed text-[#86868b] line-clamp-2">
            {product.tagline}
          </p>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
          <span className="text-[11px] text-gray-400 font-medium">
            {new Date(product.date).getFullYear()}
          </span>
          <span className="text-[11px] font-medium text-[#0066CC] group-hover:underline">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
}
