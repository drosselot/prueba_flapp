
type ProductsResponse = {
  products: DBProduct[],
  total: number,
  skip: number,
  limit: number
}

type DBProduct = {
  id: number,
  title: string,
  rating: number,
  stock: number,
  dimensions: Dimensions,
}

type Dimensions = {
  width: number,
  height: number,
  depth: number,
}