import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

interface EmptyStateProps {
  title?: string;
  message: string;
  actionLabel?: string;
  actionHref?: string;
  icon?: "search" | "error" | "cart";
}

export const EmptyState = component$((props: EmptyStateProps) => {
  return (
    <div class="py-24 px-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div class="w-16 h-16 bg-surface-dim rounded-md lg:rounded-2xl flex items-center justify-center mx-auto mb-8 border border-border">
        {props.icon === "error" ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-text-muted"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        ) : props.icon === "cart" ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-text-muted"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-text-muted"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        )}
      </div>
      
      {props.title && <h3 class="text-2xl font-semibold mb-2 tracking-tight uppercase">{props.title}</h3>}
      <p class="text-text-muted max-w-sm mx-auto leading-relaxed mb-10 font-medium">{props.message}</p>
      
      {props.actionLabel && props.actionHref && (
        <Link href={props.actionHref} class="inline-block bg-black text-white px-5 py-2.5 rounded font-semibold text-sm hover:bg-primary transition-all">
          {props.actionLabel}
        </Link>
      )}
    </div>
  );
});
