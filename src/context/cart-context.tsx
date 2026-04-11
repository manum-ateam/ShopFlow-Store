import { createContextId, useContext, useStore, component$, Slot, useContextProvider, $, useComputed$ } from "@builder.io/qwik";
import type { Product } from "~/types/prodcuts";

export interface CartItem extends Product {
  quantity: number;
  variantId?: string;
  variantName?: string;
  cartItemId?: string; // Format: {productId}-{variantId}
}

export interface CartStore {
  items: CartItem[];
  sessionId: string;
}

export const CartContext = createContextId<CartStore>("cart-context");

interface CartProviderProps {
  initialItems?: CartItem[];
  sessionId?: string;
}

export const CartProvider = component$((props: CartProviderProps) => {
  const state = useStore<CartStore>({
    items: props.initialItems || [],
    sessionId: props.sessionId || "",
  });

  useContextProvider(CartContext, state);

  return <Slot />;
});

export const useCart = () => {
  const state = useContext(CartContext);

  const addItem = $((product: Product, quantity: number = 1, variantId?: string, variantName?: string) => {
    const existingItem = state.items.find(item => item.id === product.id && item.variantId === variantId);
    if (existingItem) {
      existingItem.quantity = Math.min(99, existingItem.quantity + quantity);
    } else {
      state.items.push({ 
        ...product, 
        quantity: Math.min(99, quantity),
        variantId,
        variantName,
        cartItemId: `${product.id}-${variantId}`
      });
    }
  });

  const removeItem = $((productId: string, variantId?: string) => {
    state.items = state.items.filter(item => !(item.id === productId && item.variantId === variantId));
  });

  const updateQuantity = $((productId: string, quantity: number, variantId?: string) => {
    const item = state.items.find(item => item.id === productId && item.variantId === variantId);
    if (item) {
      item.quantity = Math.max(1, Math.min(99, quantity));
    }
  });

  const totalItems = useComputed$(() => state.items.reduce((acc, item) => acc + item.quantity, 0));
  const subtotal = useComputed$(() => state.items.reduce((acc, item) => acc + (item.price * item.quantity), 0));

  return {
    state,
    addItem,
    removeItem,
    updateQuantity,
    totalItems,
    subtotal
  };
};