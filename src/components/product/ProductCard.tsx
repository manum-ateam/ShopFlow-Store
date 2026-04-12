import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { formatCurrency } from "../../lib/utils";
import type { Product } from "../../types/products";

export interface ProductCardProps {
  product: Product;
}

export default component$(({ product }: ProductCardProps) => {
  const formattedPrice = formatCurrency(product.price);

  return (
    <div class="group h-full flex flex-col [container-type:inline-size]">
      <div class="relative aspect-square mb-6 rounded-md @[200px]:rounded-2xl overflow-hidden bg-surface-dim border border-border group-hover:border-primary/50 transition-all duration-500 hover:shadow-premium">
        <Link href={`/products/${product.id}`} class="block w-full h-full">
          <img
            src={product.images?.[0] || "https://via.placeholder.com/400"}
            alt={product.title || product.name}
            class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            width={400}
            height={400}
            loading="lazy"
          />
        </Link>
      </div>

      <div class="space-y-1">
        <div class="flex flex-col @[250px]:flex-row @[250px]:justify-between @[250px]:items-start gap-1">
          <Link href={`/products/${product.id}`} class="block">
            <h3 class="font-medium text-sm @[200px]:text-md group-hover:text-primary transition-colors line-clamp-1">{product.title || product.name}</h3>
          </Link>
          <span class="font-medium text-sm @[200px]:text-md">{formattedPrice}</span>
        </div>
        <p class="text-[10px] @[200px]:text-xs text-text-muted uppercase tracking-widest font-medium">
          {product.category || 'Collection'}
        </p>
      </div>
    </div>
  );
});