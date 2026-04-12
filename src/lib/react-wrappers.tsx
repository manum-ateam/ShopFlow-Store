/** @jsxImportSource react */
import { qwikify$ } from '@builder.io/qwik-react';
import ProductCardQwik, { type ProductCardProps } from '../components/product/ProductCard';
import CartItemQwik, { type CartItemProps } from '../components/cart/CartItem';

export const ProductCard = qwikify$<ProductCardProps>(ProductCardQwik as any, { eagerness: 'hover' });
export const CartItem = qwikify$<CartItemProps>(CartItemQwik as any, { eagerness: 'hover' });
