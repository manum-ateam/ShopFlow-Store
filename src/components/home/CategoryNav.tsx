import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

interface CategoryNavProps {
  categories: {
    id: string;
    name: string;
    slug: string;
    product_count: number;
  }[];
}

export const CategoryNav = component$((props: CategoryNavProps) => {
  return (
    <section class="py-8 bg-surface border-b border-border sticky top-20 z-40 glass">
      <div class="container-tight">
        <div class="flex items-center justify-between gap-8">
          <h2 class="hidden lg:block text-xs font-bold uppercase tracking-[0.2em] text-text-muted whitespace-nowrap">
            Categories
          </h2>

          <div class="flex-1 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
            <div class="flex items-center gap-3 lg:justify-end">
              <Link
                href="/products"
                class="px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap bg-black text-white hover:bg-primary transition-all duration-300"
              >
                All Collections
              </Link>

              {props.categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/products?category=${cat.id}`}
                  class="px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap bg-surface-dim text-text border border-transparent hover:border-primary/30 hover:bg-surface transition-all duration-300 flex items-center gap-2"
                >
                  <span>{cat.name}</span>
                  {cat.product_count !== undefined && (
                    <span class="text-[10px] bg-text/5 px-2 py-0.5 rounded-full text-text-muted">
                      {cat.product_count}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
});
