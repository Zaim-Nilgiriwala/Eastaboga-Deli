"use client";

import { useCart } from "@/components/CartContext";
import { formatPrice } from "@/components/formatPrice";

export default function ProductCard({ product }) {
    const { addToCart } = useCart();
    return (
        <div className="rounded-2xl border shadow-sm overflow-hidden flex flex-col">
      <div className="aspect-video bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{product.description}</p>

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-medium">{formatPrice(product.price)}</span>
          <button
            onClick={() => addToCart(product, 1)}
            className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50 active:scale-[0.99]"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}