import { component$, useComputed$, useVisibleTask$ } from "@builder.io/qwik";
import { Form, type DocumentHead, useLocation, Link } from "@builder.io/qwik-city";
import { useCart } from "~/context/cart-context";
import { formatCurrency } from "~/lib/utils";
import { useCheckoutAction } from "./actions";
import { emitShopFlowEvent } from "~/lib/bridge";

export { useCheckoutAction };

export default component$(() => {
  const loc = useLocation();
  const checkoutAction = useCheckoutAction();
  const { state: cart, subtotal } = useCart();
  
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    emitShopFlowEvent({ type: 'CHECKOUT_STARTED', payload: { sessionId: cart.sessionId } });
  });

  const currentStep = loc.url.searchParams.get("step") || "shipping";

  const tax = useComputed$(() => Math.round(subtotal.value * 0.08));
  const shippingCost = 999; 
  const grandTotal = useComputed$(() => subtotal.value + tax.value + shippingCost);

  if (checkoutAction.value?.success) {
    return (
      <div class="container-tight py-40 text-center animate-in zoom-in duration-500">
         <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-10 shadow-premium">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
         </div>
         <h1 class="text-4xl font-semibold uppercase tracking-tighter mb-4 italic">Thank You.</h1>
         <p class="text-text-muted font-medium mb-12 max-w-sm mx-auto tracking-normal">Your order #{checkoutAction.value.orderId} has been placed. A confirmation email will follow shortly.</p>
         <Link href="/products" class="inline-block bg-black text-white px-10 py-4 rounded-md font-bold uppercase tracking-widest text-xs hover:bg-primary transition-all">Back to Collection</Link>
      </div>
    );
  }

  return (
    <div class="container-tight py-12 md:py-24">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Step Content */}
        <div class="lg:col-span-7">
           <div class="mb-12 flex items-center gap-4">
              {['shipping', 'payment', 'review'].map((step, idx) => (
                <div key={step} class="flex items-center gap-4">
                   <div class={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black uppercase transition-all ${currentStep === step ? 'bg-primary text-white scale-110 shadow-lg' : 'bg-surface-dim text-text-muted'}`}>
                      {idx + 1}
                   </div>
                   {idx < 2 && <div class="w-8 h-[1px] bg-border" />}
                </div>
              ))}
           </div>

           <Form action={checkoutAction} class="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <input type="hidden" name="step" value={currentStep} />
              
              {currentStep === "shipping" && (
                <div class="space-y-8">
                  <h2 class="text-2xl font-semibold uppercase tracking-tight">Shipping Details</h2>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field label="Full Name" name="fullName" placeholder="Alexander McQueen" error={checkoutAction.value?.fieldErrors?.fullName?.[0]} />
                    <Field label="Email Address" name="email" type="email" placeholder="alex@designer.com" error={checkoutAction.value?.fieldErrors?.email?.[0]} />
                  </div>
                  <Field label="Street Address" name="address" placeholder="123 Fashion Ave" error={checkoutAction.value?.fieldErrors?.address?.[0]} />
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field label="City" name="city" placeholder="London" error={checkoutAction.value?.fieldErrors?.city?.[0]} />
                    <Field label="Postal / ZIP" name="zip" placeholder="W1B 2EL" error={checkoutAction.value?.fieldErrors?.zip?.[0]} />
                  </div>
                </div>
              )}

              {currentStep === "payment" && (
                <div class="space-y-8">
                  <h2 class="text-2xl font-semibold uppercase tracking-tight">Payment Method</h2>
                  <div class="p-8 bg-surface-dim rounded-lg text-white space-y-8 shadow-premium">
                     <div class="flex justify-between items-start">
                        <div class="w-12 h-10 bg-white/10 rounded-lg" />
                        <span class="text-[10px] font-black uppercase tracking-widest text-white/40 italic">ShopFlow Gold</span>
                     </div>
                     <Field variant="dark" label="Card Number" name="cardNumber" placeholder="0000 0000 0000 0000" error={checkoutAction.value?.fieldErrors?.cardNumber?.[0]} />
                     <div class="grid grid-cols-2 gap-6">
                        <Field variant="dark" label="Expiry Date" name="expiry" placeholder="MM/YY" error={checkoutAction.value?.fieldErrors?.expiry?.[0]} />
                        <Field variant="dark" label="CVV" name="cvv" placeholder="000" error={checkoutAction.value?.fieldErrors?.cvv?.[0]} />
                     </div>
                     <Field variant="dark" label="Cardholder Name" name="cardName" placeholder="Full Name on Card" error={checkoutAction.value?.fieldErrors?.cardName?.[0]} />
                  </div>
                </div>
              )}

              {currentStep === "review" && (
                <div class="space-y-8">
                  <h2 class="text-2xl font-semibold uppercase tracking-tight">Final Review</h2>
                  <div class="space-y-4">
                    {cart.items.map(item => (
                      <div key={item.id} class="flex justify-between items-center py-4 border-b border-border">
                        <div class="flex items-center gap-4">
                           <div class="w-12 h-12 bg-surface-dim rounded-lg overflow-hidden border border-border">
                              <img width={1200} height={1200} src={item.images[0]} class="w-full h-full object-cover" />
                           </div>
                           <div>
                              <p class="text-sm font-bold uppercase">{item.name}</p>
                              <p class="text-[10px] font-bold text-text-muted uppercase">Qty: {item.quantity}</p>
                           </div>
                        </div>
                        <p class="text-sm font-bold tracking-tighter">{formatCurrency(item.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div class="flex flex-col sm:flex-row gap-4 pt-8">
                {currentStep !== "shipping" && (
                  <Link 
                    href={currentStep === "payment" ? "/checkout?step=shipping" : "/checkout?step=review"}
                    class="px-8 py-5 border border-border rounded-lg font-bold uppercase tracking-widest text-[10px] hover:bg-surface-dim transition-all text-center min-h-[44px] flex items-center justify-center"
                  >
                    Previous
                  </Link>
                )}
                <button 
                  type="submit"
                  disabled={checkoutAction.isRunning}
                  class="flex-1 bg-black text-white px-10 py-5 rounded-lg font-bold uppercase tracking-widest text-[13px] bg-primary transition-all shadow-premium min-h-[58px] flex items-center justify-center gap-3 active:scale-[0.98]"
                >
                  {checkoutAction.isRunning ? 'Processing...' : (currentStep === "review" ? 'Place Order' : 'Continue to Payment')}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"/></svg>
                </button>
              </div>
           </Form>
        </div>

        {/* Sticky Summary Sidebar */}
        <aside class="lg:col-span-5 lg:sticky lg:top-32">
           <div class="bg-surface-dim p-8 md:p-12 rounded-lg border border-border space-y-10">
              <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Order Summary</h3>
              <div class="space-y-6">
                 <div class="flex justify-between font-bold text-[11px] text-text-muted uppercase tracking-widest">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal.value)}</span>
                 </div>
                 <div class="flex justify-between font-bold text-[11px] text-text-muted uppercase tracking-widest">
                    <span>Tax (8%)</span>
                    <span>{formatCurrency(tax.value)}</span>
                 </div>
                 <div class="flex justify-between font-bold text-[11px] text-text-muted uppercase tracking-widest">
                    <span>Shipping</span>
                    <span>{formatCurrency(shippingCost)}</span>
                 </div>
                 <div class="pt-6 border-t border-border flex justify-between items-end">
                    <span class="text-lg font-bold uppercase tracking-tighter">Total</span>
                    <span class="text-3xl font-bold tracking-tighter">{formatCurrency(grandTotal.value)}</span>
                 </div>
              </div>

              <div class="pt-6 space-y-4">
                 <div class="flex items-center gap-3 p-4 bg-white rounded-md border border-border shadow-sm">
                    <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <p class="text-[10px] font-bold uppercase text-text-muted">Secure 256-bit AES Encryption</p>
                 </div>
              </div>
           </div>
        </aside>

      </div>
    </div>
  );
});

interface FieldProps {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  error?: string;
  variant?: 'light' | 'dark';
}

const Field = component$((props: FieldProps) => {
  return (
    <div class="space-y-2 flex flex-col group">
      <label class={`text-[10px] font-black uppercase tracking-widest ${props.variant === 'dark' ? 'text-white/40' : 'text-text-muted'}`}>
        {props.label}
      </label>
      <input 
        name={props.name} 
        type={props.type || "text"} 
        placeholder={props.placeholder} 
        class={`w-full p-5 rounded-lg font-medium outline-hidden transition-all border min-h-[48px] placeholder:opacity-30 ${props.variant === 'dark' ? 'bg-white/5 border-white/10 text-white focus:border-white/40' : 'bg-white border-border text-text focus:border-text-muted focus:shadow-sm'}`} 
      />
      {props.error && (
        <span class="text-red-500 text-[10px] font-bold uppercase tracking-wider animate-in fade-in duration-300">
           {props.error}
        </span>
      )}
    </div>
  );
});

export const head: DocumentHead = {
  title: "Checkout Flow | ShopFlow",
};