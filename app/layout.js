import "./globals.css";
import { Inter } from "next/font/google";
import CartProvider from "@/components/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Eastaboga Deli",
    description: "Order your favorite pizza online! Website made with Next.js",
    applicationName: "Eastaboga Deli",
};

export default function RootLayout({ children }) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body className={`$inter?.className ?? ""} min-h-screen bg-background text-foreground`}>
          <CartProvider>
           <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
              <a href="/" className="font-semibold tracking-tight">Eastaboga Deli</a>
              <nav className="flex items-center gap-4 text-sm">
                <a href="/products" className="hover:underline">Menu</a>
                <a href="/cart" className="hover:underline">Cart</a>
                <a href="/owner" className="hover:underline">Owner</a>
              </nav>
            </div>
          </header>

          <main className="mx-auto max-w-6xl px-4 py-8">
            {children}
          </main>

          <footer className="border-t py-6 text-sm">
          {/* Footer Content */}
          </footer>
          </CartProvider>
        </body>
      </html>
    );
}