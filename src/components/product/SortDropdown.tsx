import { component$ } from "@builder.io/qwik";

interface SortDropdownProps {
  activeSort: string;
}

export const SortDropdown = component$((props: SortDropdownProps) => {
  return (
    <div class="flex items-center gap-3">
      <span class="hidden sm:inline text-xs font-semibold text-text-muted uppercase tracking-wider">Sort By:</span>
      <select 
        value={props.activeSort}
        class="bg-surface-dim border border-border px-4 py-2.5 rounded font-semibold text-xs uppercase outline-hidden cursor-pointer hover:border-text transition-all"
        onChange$={(e) => {
          const val = (e.target as HTMLSelectElement).value;
          const url = new URL(window.location.href);
          url.searchParams.set("sort", val);
          window.location.href = url.toString();
        }}
      >
        <option value="newest">Latest Collections</option>
        <option value="price_asc">Price: Low-High</option>
        <option value="price_desc">Price: High-Low</option>
      </select>
    </div>
  );
});
