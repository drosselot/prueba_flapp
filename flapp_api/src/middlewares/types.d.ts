type CartPostBody = {
  products: ProductInCartPostBody[],
  customer_data: CustomerData
}

type ProductInCartPostBody = {
  productId: string,
  price: number,
  quantity: number,
  discount: number,
}