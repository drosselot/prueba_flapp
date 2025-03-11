import { Product } from "@/contexts/ShoppingCartContext";

const formatProductsForBackend = (products: Product[]) => {
  return products.map((product) => ({
    productId: String(product.id),
    price: product.price,
    quantity: product.quantity,
    discount: product.discountedTotal

  }))
}

export default formatProductsForBackend;