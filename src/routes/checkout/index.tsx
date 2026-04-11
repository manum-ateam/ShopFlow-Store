import { component$ } from "@builder.io/qwik";
import { Form, routeAction$, zod$, z, type DocumentHead } from "@builder.io/qwik-city";

export const useCheckoutAction = routeAction$(async (data, { fail }) => {
  // Mock processing
  if (data.email.includes("fail")) {
    return fail(400, {
      message: "Payment declined by your bank.",
    });
  }

  return {
    success: true,
  };
}, zod$({
  email: z.string().email("Invalid email address"),
  fullName: z.string().min(3, "Full name required"),
  address: z.string().min(5, "Shipping address required"),
  city: z.string().min(2, "City required"),
  zip: z.string().min(5, "Valid PIN/ZIP code required"),
}));

export default component$(() => {
  const checkoutAction = useCheckoutAction();

  if (checkoutAction.value?.success) {
    return (
      <div class="container-tight py-40 text-center animate-in zoom-in duration-500">
         <div class="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
         </div>
         <h1 class="text-4xl font-semibold uppercase tracking-tight mb-4 text-green-600">Order Placed!</h1>
         <p class="text-text-muted font-medium mb-12">Thank you for shopping with ShopFlow. Your order is being processed.</p>
         <a href="/products" class="inline-block bg-black text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-primary transition-all">Continue Shopping</a>
      </div>
    );
  }

  return (
    <div class="container-tight py-12 md:py-24">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-semibold mb-12 uppercase tracking-tight">Checkout</h1>
        
        <Form action={checkoutAction} class="space-y-12">
          {/* Section 1: Contact */}
          <div class="space-y-6">
            <h2 class="text-xs font-bold uppercase tracking-[0.2em] text-text-muted border-b border-border pb-4">Contact Information</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div class="space-y-2 flex flex-col">
                  <label class="text-[10px] font-bold uppercase text-gray-400">Email Address</label>
                  <input name="email" type="email" placeholder="you@example.com" class="bg-surface-dim border border-border p-4 rounded-xl font-medium outline-hidden focus:ring-2 focus:ring-primary min-h-[48px]" />
                  {checkoutAction.value?.fieldErrors?.email && <span class="text-red-500 text-[10px] font-bold uppercase">{checkoutAction.value.fieldErrors.email[0]}</span>}
               </div>
               <div class="space-y-2 flex flex-col">
                  <label class="text-[10px] font-bold uppercase text-gray-400">Full Name</label>
                  <input name="fullName" type="text" placeholder="John Doe" class="bg-surface-dim border border-border p-4 rounded-xl font-medium outline-hidden focus:ring-2 focus:ring-primary min-h-[48px]" />
               </div>
            </div>
          </div>

          {/* Section 2: Shipping */}
          <div class="space-y-6">
            <h2 class="text-xs font-bold uppercase tracking-[0.2em] text-text-muted border-b border-border pb-4">Shipping Address</h2>
            <div class="space-y-2 flex flex-col">
               <label class="text-[10px] font-bold uppercase text-gray-400">Street Address</label>
               <input name="address" type="text" placeholder="123 Street Name" class="bg-surface-dim border border-border p-4 rounded-xl font-medium outline-hidden focus:ring-2 focus:ring-primary min-h-[48px]" />
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div class="space-y-2 flex flex-col">
                  <label class="text-[10px] font-bold uppercase text-gray-400">City</label>
                  <input name="city" type="text" placeholder="Mumbai" class="bg-surface-dim border border-border p-4 rounded-xl font-medium outline-hidden focus:ring-2 focus:ring-primary min-h-[48px]" />
               </div>
               <div class="space-y-2 flex flex-col">
                  <label class="text-[10px] font-bold uppercase text-gray-400">PIN / ZIP Code</label>
                  <input name="zip" type="text" placeholder="400001" class="bg-surface-dim border border-border p-4 rounded-xl font-medium outline-hidden focus:ring-2 focus:ring-primary min-h-[48px]" />
               </div>
            </div>
          </div>

          <div class="pt-8 flex flex-col gap-6">
            {checkoutAction.value?.message && (
               <div class="p-4 bg-red-50 text-red-600 rounded-xl font-bold text-xs uppercase tracking-wide border border-red-100 italic">
                  ⚠️ {checkoutAction.value.message}
               </div>
            )}
            
            <button 
              type="submit"
              disabled={checkoutAction.isRunning}
              class="w-full bg-black text-white py-6 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-primary transition-all disabled:opacity-50 shadow-premium active:scale-95 min-h-[58px]"
            >
              {checkoutAction.isRunning ? 'Processing...' : 'Complete Purchase'}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Checkout | ShopFlow",
};