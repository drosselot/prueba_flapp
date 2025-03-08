
export const isCustomerData = (customerData: any) => {

  if (!(typeof customerData === "object")) {
    return false;
  }

  if (!customerData.name || !customerData.shipping_street || !customerData.commune || !customerData.phone) {
    return false;
  }

  if (typeof customerData.name !== "string" || typeof customerData.shipping_street !== "string" || typeof customerData.commune !== "string" || typeof customerData.phone !== "string") {
    return false;
  }

  return true;
}

export const isProduct = (product: any) => {
  if (!(typeof product === "object")) {
    return false;
  }

  if (!product.productId || !product.price || !product.quantity || !product.discount) {
    return false;
  }

  if (typeof product.productId !== "string" || typeof product.price !== "number" || typeof product.quantity !== "number" || typeof product.discount !== "number") {
    return false;
  }

  return true;
}