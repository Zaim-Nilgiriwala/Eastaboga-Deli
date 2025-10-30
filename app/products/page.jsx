import ProductCard from "@/components/ProductCard";
import { products } from "@/data/menu";

export default function ProductsPage() {
    return (
        <section>
      <h1 className="text-2xl font-bold mb-4">Menu</h1>
      <p className="text-sm text-gray-600 mb-6">
        Hand-tossed pies, fresh ingredients, baked to order.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}