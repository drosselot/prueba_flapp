import { ShoppingCart } from "@/contexts/ShoppingCartContext";
import { formatNumberToChileanPesoFromUSD } from "@/utils/formatNumber";

const API_URL = "https://dummyjson.com"

export const getShoppingCart = async (id: number) => {

  const shoppingCartResponse = await fetch(`${API_URL}/carts/${id}`)
  const jsonShoppingCart = (await shoppingCartResponse.json()) as ShoppingCart;

  return jsonShoppingCart;
}

export const getShoppingCartInCHileanPesos = async (id: number) => {
  const shoppingCart = await getShoppingCart(id);

  const shoppingCartInChileanPesos: ShoppingCart = {
    ...shoppingCart,
    total: formatNumberToChileanPesoFromUSD(shoppingCart.total),

    products: shoppingCart.products.map((product) => ({
      ...product,
      total: formatNumberToChileanPesoFromUSD(product.total),
      discountedTotal: formatNumberToChileanPesoFromUSD(product.discountedTotal),
      price: formatNumberToChileanPesoFromUSD(product.price),

    }))
  }

  return shoppingCartInChileanPesos;
}
