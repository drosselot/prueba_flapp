type CartPostBody = {
  products: ProductInCartPostBody[],
  customer_data: CustomerData
}

type ProductInCartPostBody = {
  productId: string,
  price: number,
  number: number,
  discount: number,
}