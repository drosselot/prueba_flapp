
export const getFormattedCart = (cart: CartPostBody, productsInDataBase: DBProduct[]): Cart => {

  const productsInCart = new Map<string, ProductInCart>();

  cart.products.forEach((requiredProduct) => {
    const productInCart = {
      id: requiredProduct.productId,
      title: "",
      price: requiredProduct.price,
      quantity: requiredProduct.number,
      discount: requiredProduct.discount,
      stock: 0,
      realStock: 0,
      rating: 0,
      dimensions: {
        width: 0,
        height: 0,
        depth: 0,
      }
    }
    productsInCart.set(requiredProduct.productId, productInCart);
  })

  productsInDataBase.forEach((product) => {
    const productInCart = productsInCart.get(product.id);

    if (productInCart) {
      const realStock = product.stock / product.rating;

      productsInCart.set(product.id, {
        ...productInCart,
        stock: product.stock,
        realStock: realStock,
        title: product.title,
        rating: product.rating
      });
    }
  })

  const productInCartArray = Array.from(productsInCart.values());
  const resultingCart = {
    ...cart.customer_data,
    products: productInCartArray
  }

  return resultingCart;
}