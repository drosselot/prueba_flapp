import { createContext, Dispatch, SetStateAction } from 'react';

export const ShoppingCartContext = createContext<ShoppingCart | null>(null);

export const SetShoppingCartContext = createContext<Dispatch<SetStateAction<ShoppingCart | null>>>(() => {})

export type ShoppingCart = {

}