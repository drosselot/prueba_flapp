type Cart = CustomerData & {
  products: ProductInCart[]
}

type CustomerData = {
  name: string,
  shipping_street: string,
  commune: string,
  phone: string
}

type ProductInCart = DBProduct & {
  price: number,
  quantity: number,
  discount: number
  realStock: number
}