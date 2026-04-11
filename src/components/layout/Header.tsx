import { component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { useCart } from "~/context/cart-context";

export const Header = component$(( ) => {
  const loc = useLocation();
  const { totalItems } = useCart();
  
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
  ];

  return (
    <header class="sticky top-0 z-50 glass">
      <div class="container-tight h-20 flex items-center justify-between">
        <Link href="/" class="text-xl font-semibold tracking-wide flex items-center gap-2 group min-h-[44px] min-w-[44px]">
          <div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform shadow-premium">
            <span class="text-white text-lg">S</span>
          </div>
          <span class="hidden sm:inline">ShopFlow</span>
        </Link>

        <nav class="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            // Normalizing URLs to handle trailing slashes and nested paths
            const isHome = link.href === "/";
            const isActive = isHome 
              ? loc.url.pathname === "/" 
              : loc.url.pathname.startsWith(link.href);

            return (
              <Link 
                key={link.href} 
                href={link.href}
                class={`text-sm font-bold transition-colors min-h-[44px] flex items-center relative ${isActive ? 'text-primary' : 'text-text-muted hover:text-text'}`}
              >
                {link.name}
                {isActive && (
                  <span class="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary animate-in fade-in slide-in-from-bottom-1 duration-500" />
                )}
              </Link>
            );
          })}
        </nav>

        <div class="flex items-center gap-4">
          <Link href="/cart" class="relative p-2.5 hover:bg-surface-dim rounded-xl transition-colors group min-h-[44px] min-w-[44px] flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            <span class={`absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[10px] flex items-center justify-center rounded-full font-black shadow-lg animate-in zoom-in duration-300 ${totalItems.value === 0 ? 'hidden' : ''}`}>
               {totalItems.value}
            </span>
          </Link>
          <button class="md:hidden p-3 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-surface-dim">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </div>
      </div>
    </header>
  );
});
