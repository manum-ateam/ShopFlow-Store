import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export const Footer = component$(() => {
  return (
    <footer class="bg-surface-dim border-t border-border pt-16 pb-8">
      <div class="container-tight">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div class="col-span-1 md:col-span-1">
            <Link href="/" class="text-xl font-semibold tracking-wide mb-6 block">ShopFlow</Link>
            <p class="text-sm text-text-muted leading-relaxed">
              Premium e-commerce experience built for speed and performance. Zero hydration, maximum speed.
            </p>
          </div>
          
          <div>
            <h4 class="font-bold text-sm uppercase tracking-widest mb-6">Shop</h4>
            <ul class="space-y-4 text-sm text-text-muted">
              <li><Link href="/products" class="hover:text-primary transition-colors">All Products</Link></li>
              <li><Link href="/products?category=electronics" class="hover:text-primary transition-colors">Electronics</Link></li>
              <li><Link href="/products?category=fashion" class="hover:text-primary transition-colors">Fashion</Link></li>
            </ul>
          </div>

          <div>
             <h4 class="font-bold text-sm uppercase tracking-widest mb-6">Support</h4>
             <ul class="space-y-4 text-sm text-text-muted">
                <li><Link href="/help" class="hover:text-primary transition-colors">Help Center</Link></li>
                <li><Link href="/returns" class="hover:text-primary transition-colors">Returns</Link></li>
                <li><Link href="/contact" class="hover:text-primary transition-colors">Contact Us</Link></li>
             </ul>
          </div>

          <div>
             <h4 class="font-bold text-sm uppercase tracking-widest mb-6">Newsletter</h4>
             <p class="text-sm text-text-muted mb-4">Subscribe for updates and exclusive deals.</p>
             {/* <div class="flex gap-2">
               <input type="email" placeholder="Email address" class="bg-surface border border-border px-4 py-2 rounded-xl text-sm flex-1 outline-hidden focus:ring-2 focus:ring-primary/20" />
               <button class="bg-primary text-white p-2 rounded-xl hover:bg-primary-dark transition-colors">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
               </button>
             </div> */}
          </div>
        </div>
        
        <div class="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-xs text-text-muted">© 2026 ShopFlow Store. All rights reserved.</p>
          <div class="flex gap-6 text-xs text-text-muted">
            <Link href="/privacy" class="hover:text-text transition-colors">Privacy Policy</Link>
            <Link href="/terms" class="hover:text-text transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
});
