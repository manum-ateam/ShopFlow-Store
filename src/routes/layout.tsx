import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$, type RequestHandler } from "@builder.io/qwik-city";
import { Footer } from "~/components/layout/Footer";
import { Header } from "~/components/layout/Header";
import { CartProvider } from "~/context/cart-context";
import { getCart } from "~/lib/api";

export const onGet: RequestHandler = async ({ cacheControl, cookie }) => {
  //  Generate a session ID if it doesn't exist
  if (!cookie.get('sf_session')) {
    const sessionId = `sf_${Math.random().toString(36).substring(2, 15)}`;
    cookie.set('sf_session', sessionId, { path: '/', maxAge: 31536000 });
  }

  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 5,
  });
};

//  Fetch data on the server (Live API Cart)
export const useCartLoader = routeLoader$(async ({ cookie }) => {
  const sessionId = cookie.get('sf_session')?.value;
  if (!sessionId) return { items: [], subtotal: 0, sessionId: "" };

  try {
    const cartData = await getCart(sessionId);
    // Flatten the API structure for our UI components if needed
    const flattenedItems = cartData.items.map((item: any) => ({
      ...item.product, // API puts product details here
      quantity: item.quantity,
      variantId: item.variant_id,
      variantName: item.variant?.name || "Standard",
      price: item.price,
      id: item.product_id, // Keep the original product ID for navigation
      cartItemId: item.id // The formatted ID {productId}-{variantId}
    }));

    return {
      items: flattenedItems,
      subtotal: cartData.subtotal,
      sessionId: sessionId
    };
  } catch (e) {
    console.error("Cart fetch failed", e);
    return { items: [], subtotal: 0, sessionId: sessionId };
  }
});

export default component$(( ) => {
  const cartData = useCartLoader();

  return (
    <CartProvider initialItems={cartData.value.items} sessionId={cartData.value.sessionId}>
      <div class="flex flex-col min-h-screen pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] pr-[env(safe-area-inset-right)] pl-[env(safe-area-inset-left)]">
        <Header />
        <main class="flex-1">
          <Slot />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
});
