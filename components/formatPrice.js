export function formatPrice(value, currency = "USD") {
    const n = Number(value) || 0;
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
    }).format(n);
}