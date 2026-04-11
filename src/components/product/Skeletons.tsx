import { component$ } from "@builder.io/qwik";

export const ProductSkeleton = component$(() => {
  return (
    <div class="animate-pulse">
      <div class="aspect-square bg-surface-dim rounded-3xl mb-6" />
      <div class="h-6 bg-surface-dim rounded-lg w-3/4 mb-2" />
      <div class="h-4 bg-surface-dim rounded-lg w-1/2 mb-4" />
      <div class="h-6 bg-surface-dim rounded-lg w-1/4" />
    </div>
  );
});

export const ProductGridSkeleton = component$(() => {
  return (
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
});
