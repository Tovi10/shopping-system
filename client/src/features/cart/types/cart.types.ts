import type { Product } from '../../catalog/types/catalog.types';

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}