import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { getProductById } from "~/lib/api";

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
  const product = useProduct();

  if (!product.value) {
    return (
      <div class="container-tight py-40 text-center">
        <h1 class="text-3xl font-semibold mb-4 uppercase">Product Not Found</h1>
        <p class="text-text-muted mb-8 font-medium">We couldn't find the product you're looking for.</p>
        <a href="/products" class="inline-block bg-black text-white px-5 py-2.5 rounded font-semibold text-md hover:bg-primary transition-all">
          Back to Catalog
        </a>
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format((product.value.price || 0) / 100);

  return (
    <div class="container-tight py-12 md:py-24">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
        <div class="aspect-square bg-surface-dim rounded-md md:rounded-3xl overflow-hidden border border-border">
           <img 
            src={product.value.images[0]} 
            class="w-full h-full object-cover" 
            alt={product.value.name} 
            width={600} 
            height={600} 
          />
        </div>
        <div class="flex flex-col justify-center">
           <h1 class="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 tracking-tight uppercase">
            {product.value.name}
          </h1>
           <p class="text-2xl text-primary font-semibold mb-8">{formattedPrice}</p>
           <p class="text-text-muted leading-relaxed mb-12 font-medium">
            {product.value.description}
          </p>
           <button class="bg-black text-white px-8 py-3 rounded font-semibold text-md hover:bg-primary transition-all w-full md:w-auto">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const product = resolveValue(useProduct);
  return {
    title: `${product?.name || 'Product Not Found'} | ShopFlow`,
  };
};