import { getProducts, getCategories } from "~/lib/api";
import { EmptyState } from "~/components/ui/EmptyState";
import type { Category, Product } from "~/types/prodcuts";
import ProductCard from "~/components/product/ProductCard";
import { FilterContent } from "~/components/product/ProductFilters";
import { ProductListingHeader } from "~/components/product/ProductListingHeader";
import { component$, useSignal, $ } from "@builder.io/qwik";
import { routeLoader$, useLocation, type DocumentHead } from "@builder.io/qwik-city";

export const useProductsData = routeLoader$(async ({ url }) => {
  try {
    const categoryId = url.searchParams.get("category");
    const sort = url.searchParams.get("sort") || "newest";
    const query = new URLSearchParams();
    if (categoryId) query.append("category", categoryId);
    if (sort) query.append("sort", sort);

    const [products, categories] = await Promise.all([
      getProducts(`?${query.toString()}`),
      getCategories()
    ]);
    
    return { 
      products: (products || []) as Product[], 
      categories: (categories || []) as Category[], 
      error: null 
    };
  } catch (err: any) {
    return { 
      products: [] as Product[], 
      categories: [] as Category[], 
      error: err.message || "We encountered an issue loading the collection." 
    };
  }
});

export default component$(() => {
  const data = useProductsData();
  const loc = useLocation();
  const isDrawerOpen = useSignal(false);

  if (data.value.error) {
    return (
      <EmptyState 
        icon="error" 
        title="Connection Issue" 
        message={data.value.error} 
        actionLabel="Try Again" 
        actionHref="/products" 
      />
    );
  }

  const activeCategory = loc.url.searchParams.get("category");
  const activeSort = loc.url.searchParams.get("sort") || "newest";

  const getPageTitle = () => {
    if (!activeCategory) return 'All Products';
    return data.value.categories.find((c) => c.id === activeCategory)?.name || 'Collection';
  };

  return (
    <div class="container-tight py-12">
      <div class="flex flex-col lg:flex-row gap-12">
        
        {/* Mobile Filter Drawer */}
        <div class={`fixed inset-0 z-[100] lg:hidden transition-all duration-500 ${isDrawerOpen.value ? 'visible' : 'invisible'}`}>
           <div 
            class={`absolute inset-0 bg-black/80 backdrop-blur-xl transition-opacity duration-500 ${isDrawerOpen.value ? 'opacity-100' : 'opacity-0'}`} 
            onClick$={() => isDrawerOpen.value = false} 
           />
           <aside 
            class={`absolute inset-y-0 right-0 w-[85%] sm:w-96 bg-[#0A0A0A] shadow-2xl transition-transform duration-500 transform border-l border-gray-800 ${isDrawerOpen.value ? 'translate-x-0' : 'translate-x-full'}`}
           >
              <div class="flex flex-col h-full overflow-hidden">
                 <div class="flex justify-between items-center px-8 py-8 border-b border-gray-800 bg-black/40">
                    <div class="space-y-1">
                      <h2 class="text-xl font-semibold uppercase tracking-tight text-white">Catalog Filters</h2>
                      <p class="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Personalize your view</p>
                    </div>
                    <button onClick$={() => isDrawerOpen.value = false} class="w-10 h-10 flex items-center justify-center bg-gray-900 rounded-full hover:bg-gray-800 transition-colors border border-gray-800">
                       <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-white"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                 </div>
                 <div class="flex-1 overflow-y-auto px-8 py-10 scrollbar-hide bg-[#0A0A0A]">
                    <FilterContent 
                        categories={data.value.categories} 
                        activeCategory={activeCategory} 
                        activeSort={activeSort}
                        onClose$={$(() => isDrawerOpen.value = false)}
                    />
                 </div>
              </div>
           </aside>
        </div>

        {/* Desktop Filter Sidebar */}
        <aside class="hidden lg:block w-72 flex-shrink-0">
           <FilterContent 
                categories={data.value.categories} 
                activeCategory={activeCategory} 
                activeSort={activeSort}
            />
        </aside>

        {/* Main Content Area */}
        <div class="flex-1">
          <ProductListingHeader 
            title={getPageTitle()} 
            activeSort={activeSort} 
            onOpenDrawer$={$(() => isDrawerOpen.value = true)} 
          />

          {data.value.products.length === 0 ? (
            <EmptyState 
              icon="search" 
              title="No Items Found"
              message="We couldn't find any products in this specific category right now." 
              actionLabel="View All Products"
              actionHref="/products"
            />
          ) : (
            <div class="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 lg:gap-x-8 lg:gap-y-16 animate-in fade-in duration-700">
              {data.value.products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Collection | ShopFlow",
};