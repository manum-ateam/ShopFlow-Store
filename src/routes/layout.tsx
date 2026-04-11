import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$, type RequestHandler } from "@builder.io/qwik-city";
import { Footer } from "~/components/layout/Footer";
import { Header } from "~/components/layout/Header";
import { CartProvider, type CartItem } from "~/context/cart-context";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for better Core Web Vitals
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 5,
  });
};

export const useCartLoader = routeLoader$(({ cookie }) => {
  const cartCookie = cookie.get('sf_cart');
  if (cartCookie) {
    try {
      return JSON.parse(decodeURIComponent(cartCookie.value)) as CartItem[];
    } catch {
      return [] as CartItem[];
    }
  }
  return [] as CartItem[];
});

export default component$(() => {
  const initialCart = useCartLoader();

  return (
    <CartProvider initialItems={initialCart.value}>
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
