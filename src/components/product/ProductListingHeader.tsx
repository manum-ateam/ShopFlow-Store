import { component$, type PropFunction } from "@builder.io/qwik";
import { SortDropdown } from "./SortDropdown";

interface ProductListingHeaderProps {
  title: string;
  activeSort: string;
  onOpenDrawer$: PropFunction<() => void>;
}

export const ProductListingHeader = component$((props: ProductListingHeaderProps) => {
  return (
    <div class="flex justify-between items-center mb-10 gap-4">
      <div class="flex items-center gap-4">
        <button 
          onClick$={props.onOpenDrawer$}
          class="lg:hidden flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-primary transition-all shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
          Filters
        </button>
        <h1 class="text-xl md:text-2xl font-semibold uppercase tracking-tight">
          {props.title}
        </h1>
      </div>

      {/* Web View Header Sort (Aligned Far Right) */}
      <div class="hidden lg:block ml-auto">
        <SortDropdown activeSort={props.activeSort} />
      </div>
    </div>
  );
});
