import { createContext, Dispatch, SetStateAction } from 'react';

export const ShoppingCartContext = createContext<ShoppingCart | null>(null);

export const SetShoppingCartContext = createContext<Dispatch<SetStateAction<ShoppingCart | null>>>(() => {})

export type ShoppingCart = {
  id: number,
  products: Product[],
  total: number,
  discountedTotal: number,
  userId: number,
  totalProducts: number,
  totalQuantity: number
}

export type Product = {
  id: number,
  title: string,
  price: number,
  quantity: number,
  total: number,
  discountPercentage: number,
  discountedTotal: number,
  thumbnail: string
}