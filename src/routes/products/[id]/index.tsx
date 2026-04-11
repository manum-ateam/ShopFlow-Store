import { component$, useSignal } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { getProductById } from "~/lib/api";
import { formatCurrency } from "~/lib/utils";

export const useProduct = routeLoader$(async ({ params, status }) => {
  try {
    const product = await getProductById(params.id);
    return product;
  } catch {
    status(404);
    return null;
  }
});

export default component$(() => {
  const productSignal = useProduct();
  const selectedVariantId = useSignal("");
  
  if (!productSignal.value) {
    return (
      <div class="container-tight py-40 text-center">
        <h1 class="text-3xl font-semibold mb-4 uppercase">Product Not Found</h1>
        <p class="text-text-muted mb-8 font-medium">We couldn't find the product you're looking for.</p>
        <a href="/products" class="inline-block bg-black text-white px-5 py-2.5 rounded font-semibold text-md">
          Back to Catalog
        </a>
      </div>
    );
  }

  const product = productSignal.value;
  // Default to first variant if none selected
  const activeVariantId = selectedVariantId.value || product.variants?.[0]?.id;
  const activeVariant = product.variants?.find((v: any) => v.id === activeVariantId) || product.variants?.[0];

  const formattedPrice = formatCurrency(activeVariant?.price || product.price || 0);

  return (
    <div class="container-tight py-12 md:py-24">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Gallery */}
        <div class="space-y-4">
          <div class="aspect-square bg-surface-dim rounded-md md:rounded-3xl overflow-hidden border border-border">
             <img 
              src={product.images[0]} 
              class="w-full h-full object-cover" 
              alt={product.name} 
              width={600} 
              height={600} 
            />
          </div>
          <div class="grid grid-cols-4 gap-4">
            {product.images.slice(1).map((img: string, i: number) => (
               <div key={i} class="aspect-square bg-surface-dim rounded-md lg:rounded-xl overflow-hidden border border-border cursor-pointer hover:border-primary transition-all">
                  <img src={img} alt={`View ${i + 1}`} class="w-full h-full object-cover" width={150} height={150} />
               </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div class="flex flex-col justify-center">
           <div class="mb-10">
              <span class="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-4 block">Our Collection</span>
              <h1 class="text-4xl lg:text-5xl font-semibold mb-4 tracking-tight uppercase leading-tight">
                {product.name}
              </h1>
              <p class="text-3xl font-semibold text-text">{formattedPrice}</p>
           </div>

           <p class="text-text-muted leading-relaxed mb-12 font-medium text-lg">
            {product.description}
          </p>

           {/* Variant Selection */}
           {product.variants && product.variants.length > 0 && (
             <div class="mb-12">
                <h3 class="text-xs font-semibold uppercase tracking-widest text-text-muted mb-6">Select Options</h3>
                <div class="flex flex-wrap gap-3">
                   {product.variants.map((variant: any) => (
                     <button 
                        key={variant.id}
                        onClick$={() => selectedVariantId.value = variant.id}
                        class={`px-6 py-3 rounded border font-semibold text-sm transition-all ${activeVariantId === variant.id ? 'border-primary bg-primary/5 text-primary' : 'border-border bg-surface hover:border-text'}`}
                     >
                        {variant.name}
                     </button>
                   ))}
                </div>
             </div>
           )}

           {/* Inventory Status */}
           {activeVariant && (
              <div class="mb-10 flex items-center gap-2">
                 <div class={`w-2 h-2 rounded-full ${activeVariant.inventory > 0 ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                 <span class={`text-sm font-semibold uppercase tracking-wide ${activeVariant.inventory > 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {activeVariant.inventory > 0 ? `${activeVariant.inventory} units in stock` : 'Sold Out'}
                 </span>
              </div>
           )}

           <button 
              disabled={!activeVariant || activeVariant.inventory === 0}
              class="bg-black text-white px-10 py-5 rounded font-semibold text-lg hover:bg-primary transition-all w-full disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest"
           >
            {activeVariant?.inventory > 0 ? 'Add to Cart' : 'Notify Me'}
          </button>
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const product = resolveValue(useProduct);
  return {
    title: `${product?.name || 'Item'} | ShopFlow`,
  };
};