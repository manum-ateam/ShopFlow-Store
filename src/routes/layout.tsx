import { component$, Slot } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { Footer } from "~/components/layout/Footer";
import { Header } from "~/components/layout/Header";
import { CartProvider } from "~/context/cart-context";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for better Core Web Vitals
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 5,
  });
};

export default component$(() => {
  return (
    <CartProvider>
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
