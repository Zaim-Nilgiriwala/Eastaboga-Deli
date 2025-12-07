import ProductCard from "@/components/ProductCard";

export const revalidate = 0; // always serve fresh DB data

export default async function ProductsPage() {
  // Fetch live data from our own API route.
  // Because this is a server component, a relative URL is enough.
  let res;

  try {
    res = await fetch("/api/menu", {
      cache: "no-store",
    });
  } catch (e) {
    // If the network request itself fails (bad host, DNS, etc.)
    console.error("Network error calling /api/menu:", e);
    return (
      <main className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Menu</h1>
        <div className="p-6 text-red-500">
          Network error while loading products:{" "}
          <span className="text-xs">{String(e)}</span>
        </div>
      </main>
    );
  }

  if (!res.ok) {
    // Get the error body from the API so we can see what Prisma / DB said
    const text = await res.text().catch(() => "");
    console.error("Error response from /api/menu:", res.status, text);

    return (
      <main className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Menu</h1>
        <div className="p-6 text-red-500 space-y-2">
          <div>Failed to load products.</div>
          <div className="text-xs text-red-300">
            Status: {res.status}
            {text && <> – {text}</>}
          </div>
        </div>
      </main>
    );
  }

  // Convert to JSON array if everything is OK
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
