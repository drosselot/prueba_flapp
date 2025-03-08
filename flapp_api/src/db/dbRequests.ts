export const getAllProducts = async (pagination: number, current: number = 0): Promise<DBProduct[]> => {

  const productsResponse = await fetch(`https://dummyjson.com/products?limit=${pagination}&skip=${current}&select=id,title,price,stock,rating,dimensions`);
  const typedProductsResponse = (await productsResponse.json()) as ProductsResponse;

  if (current + pagination >= typedProductsResponse.total) {
    return typedProductsResponse.products;
  }

  const nextProducts = await getAllProducts(pagination, current + pagination);
  return typedProductsResponse.products.concat(nextProducts);
}