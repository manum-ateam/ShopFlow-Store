import { component$ } from "@builder.io/qwik";
import ProductCard from "./ProductCard";

export const FeaturedProducts = component$(({ products }: { products: any[] }) => {
  return (
    <section class="py-12 md:py-24">
      <div class="container-tight">
        <div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div class="max-w-xl">
             <h2 class="text-2xl md:text-3xl mb-4 tracking-tight">Handpicked Selection</h2>
             <p class="text-text-muted">Discover our most sought-after pieces, curated for quality and timeless design.</p>
          </div>
          <a href="/products" class="text-sm font-semibold text-primary group underline-offset-8 hover:underline flex items-center gap-2 transition-all">
            Browse Catalog
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="group-hover:translate-x-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </a>
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 lg:gap-x-8 lg:gap-y-16">
          {products.slice(0, 3).map((p) => (
             <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
});
