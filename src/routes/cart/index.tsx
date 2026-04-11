import { component$ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";
import { useCart } from "~/context/cart-context";
import { formatCurrency } from "~/lib/utils";
import { EmptyState } from "~/components/ui/EmptyState";

export default component$(() => {
  const { state, updateQuantity, removeItem, subtotal } = useCart();

  if (state.items.length === 0) {
    return (
      <EmptyState 
        icon="cart"
        title="Your bag is empty"
        message="Looks like you haven't added anything to your bag yet."
        actionLabel="Start Shopping"
        actionHref="/products"
      />
    );
  }

  return (
    <div class="container-tight py-12 md:py-24 animate-in fade-in duration-700">
      <h1 class="text-2xl font-medium mb-12 uppercase tracking-tight">Your Shopping Bag</h1>
      
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Line Items */}
        <div class="lg:col-span-8 space-y-6">
          {state.items.map((item) => (
            <div key={`${item.id}-${item.variantId}`} class="flex flex-col sm:flex-row gap-6 p-6 bg-surface-dim rounded-2xl border border-border group transition-all hover:border-text-muted">
              {/* Image */}
              <div class="w-full sm:w-32 aspect-square rounded-xl overflow-hidden bg-white border border-border flex-shrink-0">
                <img src={item.images[0]} alt={item.name} class="w-full h-full object-cover" width={128} height={128} />
              </div>
              
              {/* Details */}
              <div class="flex-1 flex flex-col justify-between py-1">
                <div class="flex justify-between items-start gap-4">
                  <div>
                    <Link href={`/products/${item.id}`} class="text-lg font-semibold hover:text-primary transition-colors uppercase leading-tight">
                      {item.name}
                    </Link>
                    <p class="text-xs font-bold text-text-muted mt-2 uppercase tracking-widest">
                       {item.variantName || 'Standard Edition'}
                    </p>
                  </div>
                  <p class="text-lg font-semibold">{formatCurrency(item.price)}</p>
                </div>

                <div class="flex justify-between items-end mt-8">
                  {/* Quantity Controls */}
                  <div class="flex items-center bg-gray-400 rounded-xl border border-border p-1 shadow-sm">
                    <button 
                      onClick$={() => updateQuantity(item.id, item.quantity - 1, item.variantId)}
                      disabled={item.quantity <= 1}
                      class="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-dim disabled:opacity-30 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    </button>
                    <span class="w-12 text-center font-bold text-sm">{item.quantity}</span>
                    <button 
                      onClick$={() => updateQuantity(item.id, item.quantity + 1, item.variantId)}
                      disabled={item.quantity >= 99}
                      class="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-dim disabled:opacity-30 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    </button>
                  </div>

                  <button 
                    onClick$={() => removeItem(item.id, item.variantId)}
                    class="text-xs font-bold uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors p-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div class="lg:col-span-4 lg:sticky lg:top-32">
           <div class="bg-black text-white p-8 rounded-3xl shadow-premium">
              <h2 class="text-xl font-semibold uppercase tracking-tight mb-8">Summary</h2>
              
              <div class="space-y-4 mb-8">
                 <div class="flex justify-between text-gray-400 font-medium">
                    <span class="text-sm">Subtotal</span>
                    <span class="text-sm">{formatCurrency(subtotal.value)}</span>
                 </div>
                 <div class="flex justify-between text-gray-400 font-medium">
                    <span class="text-sm">Shipping</span>
                    <span class="text-sm uppercase tracking-widest text-[10px] font-black text-primary">Free</span>
                 </div>
                 <div class="pt-4 border-t border-white/10 flex justify-between items-end">
                    <span class="text-white font-semibold uppercase tracking-tight">Total</span>
                    <span class="text-2xl font-semibold text-white">{formatCurrency(subtotal.value)}</span>
                 </div>
              </div>

              <Link 
                href="/checkout"
                class="w-full bg-white text-black py-5 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-lg flex items-center justify-center gap-3 active:scale-95"
              >
                Checkout Now
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Your Bag | ShopFlow",
};