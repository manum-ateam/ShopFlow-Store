import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { getProducts, getCategories } from "~/lib/api";
import ProductCard from "~/components/product/ProductCard";
import { EmptyState } from "~/components/ui/EmptyState";

export const useProductsData = routeLoader$(async () => {
  try {
    const [products, categories] = await Promise.all([
      getProducts(),
      getCategories()
    ]);
    
    return { products, categories, error: null };
  } catch {
    return { products: [], categories: [], error: "Failed to load catalog." };
  }
});

export default component$(() => {
  const data = useProductsData();

  if (data.value.error || (data.value.products && data.value.products.length === 0)) {
    return (
      <EmptyState 
        icon="search"
        title="No Products Found"
        message={data.value.error || "We couldn't find any products in our catalog right now."}
        actionLabel="Back to Home"
        actionHref="/"
      />
    );
  }

  return (
    <div class="container-tight py-12">
      <h1 class="text-3xl md:text-4xl font-semibold mb-12 tracking-tight uppercase">All Products</h1>
      <div class="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 lg:gap-x-8 lg:gap-y-16">
        {data.value.products.map((p: any) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Browse Products | ShopFlow",
};