import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <section class="relative w-full h-[600px] flex items-center bg-black overflow-hidden">
      {/* Immersive Background Banner Image */}
      <div class="absolute inset-0 opacity-60">
        <img 
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80" 
          alt="Banner background" 
          class="w-full h-full object-cover"
          width={1600}
          height={600}
        />
      </div>

      <div class="container-tight w-full relative z-10">
        <div class="max-w-2xl text-white">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-semibold mb-8 leading-tight uppercase  tracking-tight">
            Elevate Your Everyday Essentials.
          </h1>
          <Link href="/products" class="inline-block bg-white text-black px-5 py-2.5 rounded font-semibold text-md hover:bg-primary hover:text-white transition-all transform hover:scale-105 active:scale-95">
            Shop the Collection
          </Link>
        </div>
      </div>
    </section>
  );
});