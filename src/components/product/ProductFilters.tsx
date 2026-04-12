import { component$, type PropFunction } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { Category } from "~/types/products";

interface FilterContentProps {
  categories: Category[];
  activeCategory: string | null;
  activeSort: string;
  onClose$?: PropFunction<() => void>;
}

export const FilterContent = component$((props: FilterContentProps) => {
  return (
    <div class="space-y-12">
      {/* Mobile-only Sort Section */}
      <div class="lg:hidden">
        <h3 class="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-500 mb-8">Sort By</h3>
        <div class="space-y-3">
          {[
            { id: "newest", label: "Latest Collections" },
            { id: "price_asc", label: "Price: Low to High" },
            { id: "price_desc", label: "Price: High to Low" },
          ].map((item) => (
            <button
              key={item.id}
              onClick$={() => {
                const url = new URL(window.location.href);
                url.searchParams.set("sort", item.id);
                window.location.href = url.toString();
              }}
              class={`w-full text-left px-5 py-4 rounded-xl font-semibold text-sm transition-all border ${props.activeSort === item.id ? 'border-primary bg-primary/20 text-white' : 'border-gray-800 bg-gray-900/50 text-gray-300 hover:bg-gray-800'}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <>
        <h3 class="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-500 mb-8">Collections</h3>
        <div class="grid grid-cols-1 gap-3">
          <Link
            href="/products"
            onClick$={props.onClose$}
            class={`px-5 py-4 rounded-xl font-semibold text-sm transition-all border ${!props.activeCategory ? 'border-primary bg-primary/20 text-white shadow-sm' : 'border-transparent bg-gray-900/50 text-gray-300 hover:bg-gray-800'}`}
          >
            Show All
          </Link>
          {props.categories.map((cat) => (
            <Link
              key={cat.id}
              onClick$={props.onClose$}
              href={`/products?category=${cat.id}`}
              class={`px-5 py-4 rounded-xl font-semibold text-sm transition-all border ${props.activeCategory === cat.id ? 'border-primary bg-primary/20 text-white font-bold shadow-sm' : 'border-transparent bg-gray-900/50 text-gray-300 hover:bg-gray-800'}`}
            >
              <div class="flex justify-between items-center text-sm font-semibold">
                <span>{cat.name}</span>
                <span class="text-[10px] opacity-40">{cat.product_count}</span>
              </div>
            </Link>
          ))}
        </div>
      </>

      <>
        <h3 class="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-500 mb-8">Range Filter</h3>
        <div class="flex gap-3 items-center">
          <div class="relative flex-1">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-[9px] font-bold text-gray-600">MIN</span>
            <input type="number" placeholder="0" class="w-full bg-gray-900/50 border border-gray-800 text-white pl-12 pr-4 py-4 rounded-xl font-semibold text-sm outline-hidden focus:ring-1 focus:ring-primary placeholder:text-gray-700" />
          </div>
          <div class="relative flex-1">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-[9px] font-bold text-gray-600">MAX</span>
            <input type="number" placeholder="5000" class="w-full bg-gray-900/50 border border-gray-800 text-white pl-12 pr-4 py-4 rounded-xl font-semibold text-sm outline-hidden focus:ring-1 focus:ring-primary placeholder:text-gray-700" />
          </div>
        </div>
      </>
    </div>
  );
});
