// app/owner/page.jsx
import prisma from '@/lib/prisma';
import AddMenuItemForm from './AddMenuItemForm';

export const dynamic = 'force-dynamic'; // always show fresh data

// This should match how you're storing items in Order.items
// Example shape:
// [{ id: 1, name: "Pepperoni Pizza", price: 12.99, quantity: 2 }, ...]
function parseItems(json) {
  if (!json) return [];
  if (Array.isArray(json)) return json;
  return [];
}

export default async function OwnerPage() {
  const [menuItems, orders] = await Promise.all([
    prisma.menuItem.findMany({
      orderBy: { createdAt: 'desc' },
    }),
    prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
    }),
  ]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-10">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Owner Dashboard</h1>
            <p className="text-sm text-slate-400">
              View recent orders and your current menu.
            </p>
          </div>
          <span className="rounded-full bg-emerald-500/10 px-4 py-1 text-xs font-medium text-emerald-300 border border-emerald-500/30">
            Internal use only
          </span>
        </header>

        {/* Recent Orders */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Recent Orders</h2>

          {orders.length === 0 ? (
            <p className="text-sm text-slate-400">No orders yet.</p>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-900/80">
                  <tr className="text-left text-slate-400">
                    <th className="px-4 py-3">Order #</th>
                    <th className="px-4 py-3">Items</th>
                    <th className="px-4 py-3">Total</th>
                    <th className="px-4 py-3">Placed</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => {
                    const items = parseItems(order.items);

                    return (
                      <tr
                        key={order.id}
                        className="border-t border-slate-800/70 hover:bg-slate-800/60"
                      >
                        <td className="px-4 py-3 font-mono text-xs">
                          #{order.id}
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-200">
                          {items.length === 0 ? (
                            <span className="text-slate-500">No items</span>
                          ) : (
                            <ul className="space-y-1">
                              {items.map((item) => (
                                <li key={item.id}>
                                  {item.quantity}× {item.name}{' '}
                                  <span className="text-slate-400">
                                    (${item.price.toFixed(2)})
                                  </span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </td>
                        <td className="px-4 py-3 font-semibold">
                          ${order.total.toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-400">
                          {new Date(order.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Menu Items */}
        <section className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h2 className="text-xl font-semibold">Menu Items</h2>
              <p className="text-xs text-slate-400">
                Manage what appears on the customer menu.
              </p>
            </div>

            {/* Add Item form on the right */}
            <div className="w-full max-w-sm">
              <AddMenuItemForm />
            </div>
          </div>

          {menuItems.length === 0 ? (
            <p className="text-sm text-slate-400">
              You don&apos;t have any menu items yet.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* existing cards unchanged */}
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <h3 className="text-sm font-semibold">{item.name}</h3>
                      <p className="text-xs text-slate-400">{item.category}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold">
                        ${item.price.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {item.image && (
                    <div className="mt-3 overflow-hidden rounded-xl border border-slate-800">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-32 w-full object-cover"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}
