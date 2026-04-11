import { component$ } from "@builder.io/qwik";
import { Link, type DocumentHead, Form } from "@builder.io/qwik-city";
import { useCart } from "~/context/cart-context";
import { formatCurrency } from "~/lib/utils";
import { EmptyState } from "~/components/ui/EmptyState";
import { useCartAction } from "./actions";

export { useCartAction };

export default component$(() => {
  const { state, updateQuantity, removeItem, subtotal } = useCart();
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
    <div class="container-tight py-12 md:py-24 animate-in fade-in duration-700">
      <h1 class="text-2xl font-semibold mb-12 uppercase tracking-tighter ">Shopping Bag</h1>
      
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Line Items */}
        <div class="lg:col-span-8 space-y-6">
          {state.items.map((item) => (
            <div key={`${item.id}-${item.variantId}`} class="flex flex-col sm:flex-row gap-8 p-8 bg-surface-dim rounded-lg border border-border group transition-all hover:border-text-muted">
              {/* Image */}
              <div class="w-full sm:w-32 aspect-square rounded-lg overflow-hidden bg-white border border-border flex-shrink-0">
                <img src={item.images[0]} alt={item.name} class="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" width={128} height={128} />
              </div>
              
              {/* Details */}
              <div class="flex-1 flex flex-col justify-between py-1">
                <div class="flex justify-between items-start gap-4">
                  <div>
                    <Link href={`/products/${item.id}`} class="text-lg font-bold hover:text-primary transition-colors uppercase tracking-tight">
                      {item.name}
                    </Link>
                    <p class="text-[10px] font-black text-text-muted mt-2 uppercase tracking-widest">
                       {item.variantName || 'Standard'}
                    </p>
                  </div>
                  <p class="text-lg font-bold tracking-tighter">{formatCurrency(item.price)}</p>
                </div>

                <div class="flex justify-between items-end mt-10">
                  <div class="flex items-center gap-4">
                     <Form action={cartAction} onSubmitCompleted$={() => updateQuantity(item.id, item.quantity - 1, item.variantId)}>
                        <input type="hidden" name="type" value="update" />
                        <input type="hidden" name="id" value={item.cartItemId} />
                        <input type="hidden" name="quantity" value={item.quantity - 1} />
                        <button 
                          disabled={item.quantity <= 1 || cartAction.isRunning}
                          class="w-10 h-10 flex items-center justify-center rounded-xl border border-border bg-surface-dim disabled:opacity-30 transition-all shadow-sm"
                          aria-label="Decrease"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </button>
                     </Form>

                     <span class="w-8 text-center font-black text-xs">{item.quantity}</span>

                     <Form action={cartAction} onSubmitCompleted$={() => updateQuantity(item.id, item.quantity + 1, item.variantId)}>
                        <input type="hidden" name="type" value="update" />
                        <input type="hidden" name="id" value={item.cartItemId} />
                        <input type="hidden" name="quantity" value={item.quantity + 1} />
                        <button 
                          disabled={item.quantity >= 99 || cartAction.isRunning}
                          class="w-10 h-10 flex items-center justify-center rounded-xl border border-border bg-surface-dim disabled:opacity-30 transition-all shadow-sm"
                          aria-label="Increase"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </button>
                     </Form>
                  </div>

                  <Form action={cartAction} onSubmitCompleted$={() => removeItem(item.id, item.variantId)}>
                    <input type="hidden" name="type" value="remove" />
                    <input type="hidden" name="id" value={item.cartItemId} />
                    <button class="text-[10px] font-black uppercase tracking-[0.2em] text-red-500 hover:text-red-700 transition-colors p-2 underline decoration-2 underline-offset-4">
                      Remove
                    </button>
                  </Form>
                </div>
              </div>
            </div>
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