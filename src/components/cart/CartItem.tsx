import { component$ } from "@builder.io/qwik";
import { Link, Form } from "@builder.io/qwik-city";
import { formatCurrency } from "~/lib/utils";
import type { CartItem as ICartItem } from "~/context/cart-context";

export interface CartItemProps {
  item: ICartItem;
  cartAction: any;
  onUpdateQuantity$?: any;
  onRemove$?: any;
}

export default component$(({ item, cartAction, onUpdateQuantity$, onRemove$ }: CartItemProps) => {
  return (
    <div class="[container-type:inline-size] bg-surface-dim rounded-lg border border-border group transition-all hover:border-text-muted">
      <div class="flex flex-col @[500px]:flex-row gap-8 p-8">
        {/* Image */}
        <div class="w-full @[500px]:w-32 aspect-square rounded-lg overflow-hidden bg-white border border-border flex-shrink-0">
          <img src={item.images?.[0]} alt={item.name} class="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" width={128} height={128} />
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
               <Form action={cartAction} onSubmitCompleted$={onUpdateQuantity$}>
                  <input type="hidden" name="type" value="update" />
                  <input type="hidden" name="id" value={item.cartItemId} />
                  <input type="hidden" name="quantity" value={item.quantity - 1} />
                  <button 
                    disabled={item.quantity <= 1 || cartAction.isRunning}
                    class="w-10 h-10 flex items-center justify-center cursor-pointer rounded-xl border border-border bg-surface-dim disabled:opacity-30 transition-all shadow-sm"
                    aria-label="Decrease"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </button>
               </Form>

               <span class="w-8 text-center font-black text-xs">{item.quantity}</span>

               <Form action={cartAction} onSubmitCompleted$={onUpdateQuantity$}>
                  <input type="hidden" name="type" value="update" />
                  <input type="hidden" name="id" value={item.cartItemId} />
                  <input type="hidden" name="quantity" value={item.quantity + 1} />
                  <button 
                    disabled={item.quantity >= 99 || cartAction.isRunning}
                    class="w-10 h-10 flex items-center cursor-pointer justify-center rounded-xl border border-border bg-surface-dim disabled:opacity-30 transition-all shadow-sm"
                    aria-label="Increase"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </button>
               </Form>
            </div>

            <Form action={cartAction} onSubmitCompleted$={onRemove$}>
              <input type="hidden" name="type" value="remove" />
              <input type="hidden" name="id" value={item.cartItemId} />
              <button class="text-[10px] font-black uppercase tracking-[0.2em] text-red-500 hover:text-red-700 transition-colors p-2 underline decoration-2 underline-offset-4">
                Remove
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
});