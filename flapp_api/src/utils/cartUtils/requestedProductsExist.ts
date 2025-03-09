
const requestedProductsExist = (requestedProducts: ProductInCartPostBody[], allProducts: DBProduct[]) => {
  const productsFound = new Map<number, boolean>();

  requestedProducts.forEach((product) => {
    productsFound.set(parseInt(product.productId), false);
  })

  allProducts.forEach((product) => {
    if (productsFound.has(product.id)) {
      productsFound.set(product.id, true);
    }
  })

  const valuesArray = Array.from(productsFound.values());
  return valuesArray.every((found) => found);
}

export default requestedProductsExist;