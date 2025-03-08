const canSatisfySolicitedQuantity = (products: ProductInCart[]) => {
  return products.every((product) => product.realStock >= product.quantity);
}

export default canSatisfySolicitedQuantity;