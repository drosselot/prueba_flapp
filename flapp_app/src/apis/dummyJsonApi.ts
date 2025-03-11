import { ShoppingCart } from "@/contexts/ShoppingCartContext";

const API_URL = "https://dummyjson.com"

export const getShoppingCart = async (id: number) => {

  const shoppingCartResponse = await fetch(`${API_URL}/carts/${id}`)
  const jsonShoppingCart = (await shoppingCartResponse.json()) as ShoppingCart;

  return jsonShoppingCart;
}
