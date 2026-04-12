export type ShopFlowEvent = 
  | { type: 'ITEM_ADDED', payload: { productId: string, variantId?: string, quantity: number } }
  | { type: 'ITEM_REMOVED', payload: { productId: string, variantId?: string } }
  | { type: 'QUANTITY_UPDATED', payload: { productId: string, variantId?: string, quantity: number } }
  | { type: 'CHECKOUT_STARTED', payload: { sessionId: string } };

export const emitShopFlowEvent = (event: ShopFlowEvent) => {
  if (typeof window !== 'undefined') {
    // Emit to parent if in iframe
    window.parent.postMessage({ source: 'shopflow', ...event }, '*');
    
    // Also emit to current window (useful for some listeners)
    window.dispatchEvent(new CustomEvent('shopflow-event', { detail: event }));
    
    // Log for debugging (production grade)
    console.debug('[ShopFlow Bridge] Emitting event:', event);
  }
};
