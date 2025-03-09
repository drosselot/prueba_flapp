export const getAllProducts = async (pagination: number): Promise<DBProduct[]> => {

  const firstProductsResponse = await fetch(`https://dummyjson.com/products?limit=${pagination}&skip=0&select=id,title,price,stock,rating,dimensions`);
  const typedFirstProductsResponse = (await firstProductsResponse.json()) as ProductsResponse;

  const responsesPromises: Promise<ProductsResponse>[] = [];

  for (let current = pagination; current <= typedFirstProductsResponse.total; current += pagination) {
    responsesPromises.push(fetch(`https://dummyjson.com/products?limit=${pagination}&skip=${current}&select=id,title,price,stock,rating,dimensions`)
                            .then((response) => response.json()))
  }

  const resolvedResponses = await Promise.all(responsesPromises);

  let products = typedFirstProductsResponse.products;
  resolvedResponses.forEach((response) => {
    products = products.concat(response.products)
  })
  return products;
}