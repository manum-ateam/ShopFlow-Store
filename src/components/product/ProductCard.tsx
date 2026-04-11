import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

interface ProductCardProps {
  product: any;
}

export default component$(({ product }: ProductCardProps) => {
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format((product.price || 0) / 100);

  return (
    <div class="group">
      <div class="relative aspect-square mb-6 rounded-md md:rounded-3xl overflow-hidden bg-surface-dim border border-border group-hover:border-primary/50 transition-all duration-500 hover:shadow-premium">
        <Link href={`/products/${product.id}`} class="block w-full h-full">
          <img 
            src={product.images?.[0] || "https://via.placeholder.com/400"} 
            alt={product.title || product.name} 
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            width={400}
            height={400}
          />
        </Link>
        <button class="absolute bottom-4 right-4 w-12 h-12 bg-surface rounded-2xl flex items-center justify-center shadow-lg transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-white">
           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        </button>
      </div>

      <div class="space-y-1">
        <div class="flex justify-between items-start">
          <Link href={`/products/${product.id}`} class="block">
            <h3 class="font-medium text-md group-hover:text-primary transition-colors line-clamp-1">{product.title || product.name}</h3>
          </Link>
          <span class="font-medium text-md">{formattedPrice}</span>
        </div>
        <p class="text-xs text-text-muted uppercase tracking-widest font-medium">
           {product.category || 'Collection'}
        </p>
      </div>
    </div>
  );
});