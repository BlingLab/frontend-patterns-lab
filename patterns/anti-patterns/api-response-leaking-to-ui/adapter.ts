export function adaptApiProduct(product: { product_name: string; price_cents: number }) { return { name: product.product_name, price: product.price_cents / 100 }; }
