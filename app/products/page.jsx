import ProductCard from "@/components/ProductCard";

export const revalidate = 0; // always serve fresh DB data

export default async function ProductsPage() {
  //fetch live data from backend API

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

  const res = await fetch(`${baseUrl}/api/menu`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="p-6 text-red-500">
        Failed to load products.
      </div>
    );
  }

  //convert to json array
  const menuItems = await res.json();

  return (
  <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Menu</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {menuItems.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </main>
  );
}