import { component$, useSignal, $ } from "@builder.io/qwik";
import { routeLoader$, routeAction$, Form, zod$, z, type DocumentHead } from "@builder.io/qwik-city";
import { getProductById } from "~/lib/api";
import { formatCurrency } from "~/lib/utils";
import { useCart } from "~/context/cart-context";

import type { Product } from "~/types/prodcuts";

export const useProduct = routeLoader$(async ({ params, status }) => {
  try {
    const product = await getProductById(params.id) as Product;
    return product;
  } catch {
    status(404);
    return null;
  }
});

export const useAddToCartAction = routeAction$(async (data, { fail }) => {
  const product = await getProductById(data.productId) as Product;
  const variant = product.variants?.find((v) => v.id === data.variantId);

  if (!variant || variant.inventory <= 0) {
    return fail(400, {
      message: "This variant is currently out of stock.",
    });
  }

  if (data.quantity > 99) {
    return fail(400, {
      message: "Maximum 99 items allowed per product.",
    });
  }

  return {
    success: true,
    addedProduct: product,
    variantName: variant.name,
  };
}, zod$({
  productId: z.string(),
  variantId: z.string(),
  quantity: z.coerce.number().min(1).max(99),
}));

export default component$(() => {
  const productSignal = useProduct();
  const addToCartAction = useAddToCartAction();
  const selectedVariantId = useSignal("");
  const { addItem } = useCart();
  
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

  const product = productSignal.value as Product;
  const activeVariantId = selectedVariantId.value || product.variants?.[0]?.id;
  const activeVariant = product.variants?.find((v) => v.id === activeVariantId) || product.variants?.[0];

  const formattedPrice = formatCurrency(activeVariant?.price || product.price || 0);

  const handleSuccess = $(() => {
    if (addToCartAction.value?.success) {
      addItem(
        product, 
        1, 
        activeVariantId, 
        activeVariant?.name
      );
    }
  });

  return (
    <div class="container-tight py-12 md:py-24">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <div class="space-y-4">
          <div class="aspect-square bg-surface-dim rounded-md lg:rounded-2xl overflow-hidden border border-border transition-all hover:shadow-premium">
             <img 
              src={product.images[0]} 
              class="w-full h-full object-cover" 
              alt={product.name} 
              width={600} 
              height={600} 
            />
          </div>
        </div>

        <div class="flex flex-col justify-start pt-4 lg:pt-0">
           <div class="mb-10">
              <span class="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-4 block">Our Collection</span>
              <h1 class="text-xl lg:text-3xl font-semibold mb-4 tracking-tight uppercase leading-tight">
                {product.name}
              </h1>
              <p class="text-2xl font-semibold text-text">{formattedPrice}</p>
           </div>

           <p class="text-text-muted leading-relaxed mb-12 font-medium text-sm lg:max-w-md">
            {product.description}
          </p>

           <Form action={addToCartAction} onSubmitCompleted$={handleSuccess}>
              <input type="hidden" name="productId" value={product.id} />
              <input type="hidden" name="variantId" value={activeVariantId} />
              <input type="hidden" name="quantity" value={1} />

              {product.variants && product.variants.length > 0 && (
                <div class="mb-12">
                    <h3 class="text-xs font-bold uppercase tracking-widest text-text-muted mb-6">Select Option</h3>
                    <div class="flex flex-wrap gap-3">
                      {product.variants.map((v) => (
                        <button 
                            key={v.id}
                            type="button"
                            onClick$={() => selectedVariantId.value = v.id}
                            class={`px-6 py-3 rounded-lg border font-semibold text-sm transition-all min-h-[44px] min-w-[44px] ${activeVariantId === v.id ? 'border-primary bg-primary/10 text-primary shadow-sm' : 'border-border bg-surface-dim text-text hover:border-text-muted'}`}
                        >
                            {v.name}
                        </button>
                      ))}
                    </div>
                </div>
              )}

              <div class="mb-10 flex items-center gap-3">
                  <div class={`w-2 h-2 rounded-full ${(activeVariant?.inventory ?? 0) > 0 ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                  <span class={`text-[11px] font-bold uppercase tracking-wider ${(activeVariant?.inventory ?? 0) > 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {(activeVariant?.inventory ?? 0) > 0 ? `${activeVariant!.inventory} available now` : 'Out of Stock'}
                  </span>
              </div>

              <div class="space-y-4">
                 <button 
                    disabled={!activeVariant || (activeVariant?.inventory ?? 0) <= 0 || addToCartAction.isRunning}
                    class="bg-black text-white px-10 py-5 rounded-lg font-bold text-sm bg-primary transition-all w-full disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest min-h-[54px] shadow-premium flex items-center justify-center gap-3"
                 >
                    {addToCartAction.isRunning && <div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                    {(activeVariant?.inventory ?? 0) > 0 ? 'Add to Bag' : 'Out of Stock'}
                 </button>
                 
                 {addToCartAction.value?.message && (
                    <div class="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 font-semibold text-xs animate-in slide-in-from-top-2">
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                       {addToCartAction.value.message}
                    </div>
                 )}
                 {addToCartAction.value?.success && (
                    <div class="p-4 bg-green-50 border border-green-100 rounded-xl flex items-center gap-3 text-green-700 font-semibold text-xs animate-in slide-in-from-top-2">
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                       Added {addToCartAction.value.variantName} to your bag!
                    </div>
                 )}
              </div>
           </Form>
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const product = resolveValue(useProduct);
  return {
    title: `${product?.name || 'Store'} | ShopFlow`,
  };
};