import { component$, Slot } from "@builder.io/qwik";
import { type RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Widgets and WebViews should be fast and stale-safe
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24,
    maxAge: 60,
  });
};

export default component$(() => {
  return (
    <div class="min-h-screen bg-white">
      <div class="pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] pr-[env(safe-area-inset-right)] pl-[env(safe-area-inset-left)]">
        <Slot />
      </div>
    </div>
  );
});
