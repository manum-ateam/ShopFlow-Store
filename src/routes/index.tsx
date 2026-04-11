import Hero from "~/components/home/hero";
import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { CategoryNav } from "~/components/home/CategoryNav";
import { FeaturedProducts } from "~/components/product/FeaturedProducts";
import { EmptyState } from "~/components/ui/EmptyState";
import { getFeaturedProducts, getCategories } from "~/lib/api";

export const useHomeData = routeLoader$(async () => {
  try {
    const [products, categories] = await Promise.all([
      getFeaturedProducts(),
      getCategories()
    ]);

    return { 
      products: products || [], 
      categories: categories || [],
      error: null 
    };
  } catch (e: any) {
    return { 
      products: [], 
      categories: [],
      error: e.message || "Unable to load data at this time." 
    };
  }
});

export default component$(() => {
  const homeData = useHomeData();

  return (
    <>
      <Hero />
      <CategoryNav categories={homeData.value.categories} />
      <div class="">
        {homeData.value.error ? (
          <EmptyState 
            icon="error"
            title="Error"
            message={homeData.value.error} 
            actionLabel="Try Refreshing"
            actionHref="/"
          />
        ) : homeData.value.products.length === 0 ? (
          <EmptyState 
            icon="search"
            title="Coming Soon"
            message="We are currently updating our featured collection. Check back soon for new arrivals!"
            actionLabel="View All Products"
            actionHref="/products"
          />
        ) : (
          <FeaturedProducts products={homeData.value.products} />
        )}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "ShopFlow | Premium E-commerce Store",
  meta: [
    {
      name: "description",
      content: "Discover premium products in our resumable storefront.",
    },
  ],
};
