// app/page.js
import Link from "next/link";
import { products } from "@/data/menu";

const featured = products.slice(0, 3);

export default function Home() {
  return (
    <main className="min-h-[80vh]">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-16 sm:py-20 text-center">
        <span className="inline-block rounded-full border px-4 py-1 text-sm opacity-80">
          Fresh • Fast • Local
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight mt-4">
          Eastaboga Deli
        </h1>
        <p className="max-w-2xl mx-auto text-base sm:text-lg opacity-80 mt-3">
          Hand-crafted sandwiches and hot meals made to order. Order online for pickup—ready in minutes.
        </p>

        <div className="flex items-center justify-center gap-3 mt-6">
          <Link href="/products" className="rounded-xl px-5 py-3 border hover:bg-black hover:text-white transition">
            View Menu
          </Link>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-10 text-left sm:text-center">
          {[
            { title: "Made to Order", subtitle: "Fresh, never frozen" },
            { title: "Ready in Minutes", subtitle: "Skip the line" },
            { title: "Local Favorite", subtitle: "Family-owned & friendly" },
          ].map((b, i) => (
            <li key={i} className="rounded-2xl border p-4">
              <p className="font-semibold">{b.title}</p>
              <p className="text-sm opacity-75">{b.subtitle}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Featured items */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl font-semibold">Popular This Week</h2>
          <Link href="/products" className="text-sm underline opacity-80 hover:opacity-100">
            See full menu →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {featured.map((item) => (
            <article key={item.id} className="rounded-2xl border p-4 flex flex-col justify-between">
              <div>
                <div className="mb-3 h-36 rounded-xl bg-gray-100 flex items-center justify-center text-5xl">
                  🥪
                </div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm opacity-75">{item.desc}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-semibold">${item.price.toFixed(2)}</span>
                <Link href={`/products#${item.id}`} className="rounded-lg px-3 py-2 border hover:bg-black hover:text-white transition text-sm">
                  Add to Cart
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Hours & location */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl border p-5">
            <p className="text-sm opacity-70">Hours</p>
            <p className="mt-2">Mon–Sat: 10:00a – 8:00p</p>
            <p>Sun: 11:00a – 6:00p</p>
          </div>
          <div className="rounded-2xl border p-5">
            <p className="text-sm opacity-70">Location</p>
            <p className="mt-2">123 Main St, Eastaboga, AL</p>
            <p className="opacity-70 text-sm">Inside Eastaboga Gas & Deli</p>
          </div>
          <div className="rounded-2xl border p-5">
            <p className="text-sm opacity-70">Call Ahead</p>
            <p className="mt-2 font-semibold">(555) 123-4567</p>
            <p className="opacity-70 text-sm">We’ll start your order right away.</p>
          </div>
        </div>
      </section>

      <footer className="max-w-6xl mx-auto px-4 py-10 opacity-70 text-sm">
        © {new Date().getFullYear()} Eastaboga Deli • Built with Next.js
      </footer>
    </main>
  );
}
