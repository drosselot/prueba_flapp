
export const getFormattedCart = (cart: CartPostBody, productsInDataBase: DBProduct[]): Cart => {

  const productsInCart = new Map<number, ProductInCart>();

  cart.products.forEach((requiredProduct) => {
    const parsedId = parseInt(requiredProduct.productId)
    const productInCart = {
      id: parsedId,
      title: "",
      price: requiredProduct.price,
      quantity: requiredProduct.quantity,
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
    productsInCart.set(parsedId, productInCart);
  })

  productsInDataBase.forEach((product) => {
    const productInCart = productsInCart.get(product.id);

    if (productInCart) {
      const realStock = product.stock / product.rating;

      productsInCart.set(product.id, {
        ...productInCart,
        title: product.title,
        stock: product.stock,
        realStock: realStock,
        rating: product.rating,
        dimensions: product.dimensions
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