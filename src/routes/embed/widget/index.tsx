import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { getFeaturedProducts } from "~/lib/api";
import ProductCard from "~/components/product/ProductCard";
import type { Product } from "~/types/prodcuts";

export const useFeaturedProducts = routeLoader$(async () => {
  try {
    const products = await getFeaturedProducts();
    return products as Product[];
  } catch {
    return [] as Product[];
  }
});

export default component$(() => {
  const products = useFeaturedProducts();

  return (
    <div class="p-4 bg-white">
      <div class="flex items-center justify-between mb-6">
         <h2 class="text-xs font-black uppercase tracking-[0.3em] text-primary">Featured Items</h2>
         <div class="h-[1px] flex-1 bg-border mx-4" />
         <span class="text-[9px] font-bold text-text-muted uppercase">ShopFlow</span>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {products.value.slice(0, 6).map((product) => (
          <div key={product.id} class="scale-90 origin-top-left -mb-4 -mr-4">
             <ProductCard product={product} />
          </div>
        ))}
      </div>

      <a 
        href="/products" 
        target="_blank" 
        class="mt-8 flex items-center justify-center w-full py-3 border border-border rounded-md text-[10px] font-black uppercase tracking-widest hover:bg-surface-dim transition-all"
      >
        View All Products
      </a>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Product Widget | ShopFlow",
};