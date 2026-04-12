import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$, useLocation } from "@builder.io/qwik-city";
import { Footer } from "~/components/layout/Footer";
import { Header } from "~/components/layout/Header";
import { CartProvider } from "~/context/cart-context";
import { EnvProvider } from "~/context/env-context";
import { getCart } from "~/lib/api";

//  Fetch data on the server (Live API Cart)
export const useCartLoader = routeLoader$(async ({ cookie }) => {
  let sessionId = cookie.get('sf_session')?.value;
  if (!sessionId) {
    sessionId = `sf_${Math.random().toString(36).substring(2, 15)}`;
    cookie.set('sf_session', sessionId, { path: '/', maxAge: 31536000 });
  }

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

export const useEnvLoader = routeLoader$(({ request, url }) => {
  const userAgent = request.headers.get('user-agent') || '';
  const secFetchDest = request.headers.get('sec-fetch-dest') || '';
  
  const isWebView = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)|Android.*(wv|\.0\.0\.0)/.test(userAgent);
  const isIframe = secFetchDest === 'iframe' || url.searchParams.get('iframe') === '1';
  
  return {
    isIframe,
    isWebView,
    isStandalone: !isIframe && !isWebView
  };
});

export default component$(() => {
  const cartData = useCartLoader();
  const envData = useEnvLoader();
  const loc = useLocation();

  const isEmbed = loc.url.pathname.startsWith('/embed');
  const env = envData.value;

  return (
    <CartProvider initialItems={cartData.value.items} sessionId={cartData.value.sessionId}>
      <EnvProvider initialState={env}>
        <div class={`flex flex-col min-h-screen ${env.isWebView ? 'webview-mode' : ''} pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] pr-[env(safe-area-inset-right)] pl-[env(safe-area-inset-left)]`}>
          {!isEmbed && env.isStandalone && <Header />}
          <main class="flex-1">
            <Slot />
          </main>
          {!isEmbed && env.isStandalone && <Footer />}
        </div>
      </EnvProvider>
    </CartProvider>
  );
});
