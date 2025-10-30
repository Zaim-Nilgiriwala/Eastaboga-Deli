// app/cart/page.jsx
"use client";

import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { formatPrice } from "@/components/formatPrice";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, cost } = useCart();

  const onQtyChange = (id, e) => {
    const val = Number(e.target.value);
    updateQuantity(id, isNaN(val) ? 1 : val);
  };

  if (cart.length === 0) {
    return (
      <section className="text-center">
        <h1 className="text-2xl font-bold mb-3">Your Cart</h1>
        <p className="text-gray-600 mb-6">Your cart is empty.</p>
        <Link href="/products" className="underline">
          Browse the menu
        </Link>
      </section>
    );
  }

  return (
    <section className="grid gap-8 md:grid-cols-[1fr_320px]">
      {/* Items */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Your Cart</h1>

        {cart.map((item) => (
          <div key={item.id} className="flex items-center gap-4 border rounded-xl p-3">
            <div className="h-20 w-28 bg-gray-100 overflow-hidden rounded-lg">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="flex-1">
              <div className="font-medium">{item.name}</div>
              <div className="text-sm text-gray-600">{formatPrice(item.price)}</div>

              <div className="mt-2 flex items-center gap-2">
                <label htmlFor={`qty-${item.id}`} className="text-sm">Qty</label>
                <input
                  id={`qty-${item.id}`}
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => onQtyChange(item.id, e)}
                  className="w-20 rounded-md border px-2 py-1 text-sm"
                />
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-2 text-red-600 hover:underline text-sm"
                >
                  Remove
                </button>
              </div>
            </div>

            <div className="font-semibold">
              {formatPrice(item.price * item.quantity)}
            </div>
          </div>
        ))}

        {/* Actions under the list (once) */}
        <div className="flex items-center gap-3">
          <Link href="/products" className="underline text-sm">Continue shopping</Link>
          <button
            onClick={clearCart}
            className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50"
          >
            Clear cart
          </button>
        </div>
      </div>

      {/* Summary */}
      <aside className="h-fit rounded-2xl border p-4">
        <h2 className="text-lg font-semibold mb-3">Order Summary</h2>

        <div className="flex items-center justify-between py-2">
          <span>Subtotal</span>
          <span className="font-medium">{formatPrice(cost)}</span>
        </div>

        <div className="my-4 h-px bg-gray-200" />

        <div className="flex items-center justify-between text-lg font-semibold">
          <span>Total</span>
          <span>{formatPrice(cost)}</span>
        </div>

        <button
          onClick={() => alert("Checkout coming soon 🚧")}
          className="mt-4 w-full rounded-xl border px-4 py-2 text-sm hover:bg-gray-50"
        >
          Checkout
        </button>
      </aside>
    </section>
  );
}
