import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { getProducts } from "~/lib/api";
import type { Product } from "~/types/products";

export const useProducts = routeLoader$(async () => {
  try {
    const products = await getProducts();
    return products as Product[];
  } catch {
    return [] as Product[];
  }
});

export default component$(() => {
  const products = useProducts();

  return (
    <div class="bg-white min-h-screen">
      {/* 📱 App Header - Minimal and Clean */}
      <div class="px-6 py-8">
        <h1 class="text-3xl font-bold tracking-tighter uppercase mb-2">Discover</h1>
        <p class="text-xs font-medium text-text-muted uppercase tracking-widest">New Arrivals & Exclusives</p>
      </div>

      <div class="flex flex-col gap-px bg-border">
        {products.value.map((product) => (
          <div key={product.id} class="bg-white px-6 py-6 active:bg-surface-dim transition-colors">
            <div class="flex gap-6">
              <div class="w-32 h-32 rounded-lg overflow-hidden border border-border flex-shrink-0">
                <img width={1200} height={1200} src={product.images[0]} class="w-full h-full object-cover" />
              </div>
              <div class="flex-1 flex flex-col justify-center gap-2">
                <h3 class="text-sm font-bold uppercase tracking-tight">{product.name}</h3>
                <p class="text-[10px] font-medium text-text-muted line-clamp-2 leading-relaxed">
                  {product.description}
                </p>
                <div class="mt-4 flex items-center justify-between">
                  <span class="text-sm font-black tracking-tighter italic">From {Math.round(product.price / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                  <a
                    href={`/products/${product.id}`}
                    class="bg-primary text-white h-11 px-6 rounded-md font-black text-[10px] uppercase tracking-widest shadow-sm flex items-center justify-center active:bg-primary-dark transition-colors"
                  >
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div class="p-10 text-center">
        <div class="w-8 h-1 bg-border rounded-full mx-auto mb-4" />
        <p class="text-[8px] font-black uppercase tracking-[0.4em] text-text-muted">End of Collection</p>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "ShopFlow App | View",
  meta: [
    { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" }
  ]
};