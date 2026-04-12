import { component$, $ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";
import { useCart } from "~/context/cart-context";
import { formatCurrency } from "~/lib/utils";
import { EmptyState } from "~/components/ui/EmptyState";
import { useCartAction } from "./actions";
import CartItem from "~/components/cart/CartItem";

export { useCartAction };

export default component$(() => {
  const { state, removeItem, subtotal } = useCart();
  const cartAction = useCartAction();

  if (state.items.length === 0) {
    return (
      <EmptyState 
        icon="cart"
        title="Your Bag is Empty"
        message="Browse our collection and find something unique."
        actionLabel="Start Shopping"
        actionHref="/products"
      />
    );
  }

  return (
    <div class="container-tight py-12 md:py-24">
      <h1 class="text-2xl font-semibold mb-12 uppercase tracking-tighter ">Shopping Bag</h1>
      
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Line Items */}
        <div class="lg:col-span-8 space-y-6">
          {state.items.map((item) => (
            <CartItem 
              key={`${item.id}-${item.variantId}`}
              item={item} 
              cartAction={cartAction}
              onUpdateQuantity$={$(() => {
                // Actions trigger a refresh, but we update context for immediate feedback
                // Actually, the Form data is in the event, but we can just trust the loader for now
                // or optimistically update if needed.
              })}
              onRemove$={$(() => {
                 removeItem(item.id, item.variantId);
              })}
            />
          ))}
        </div>

        {/* Summary Sidebar */}
        <div class="lg:col-span-4 lg:sticky lg:top-32">
           <div class="bg-surface-dim text-white p-10 rounded-lg shadow-premium">
              <h2 class="text-xl font-semibold uppercase tracking-tighter mb-10 ">Summary</h2>
              
              <div class="space-y-6 mb-12">
                 <div class="flex justify-between text-gray-400 font-bold uppercase text-[10px] tracking-widest">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal.value)}</span>
                 </div>
                 <div class="flex justify-between text-gray-400 font-bold uppercase text-[10px] tracking-widest">
                    <span>Shipping</span>
                    <span class="text-primary">Free</span>
                 </div>
                 <div class="pt-8 border-t border-white/10 flex justify-between items-end">
                    <span class="text-white font-bold uppercase tracking-tight ">Estimated Total</span>
                    <span class="text-3xl font-semibold tracking-tighter text-white">{formatCurrency(subtotal.value)}</span>
                 </div>
              </div>

              <Link 
                href="/checkout"
                class="w-full bg-white text-black py-4 rounded-md font-medium uppercase tracking-widest text-[12px] hover:bg-primary hover:text-white transition-all shadow-premium flex items-center justify-center gap-3 active:scale-95"
              >
                Proceed to Checkout
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Shopping Bag | ShopFlow",
};