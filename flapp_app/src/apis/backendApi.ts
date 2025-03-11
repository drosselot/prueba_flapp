
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getTariff = async (body: GetTariffBody) => {

  const apiResponse = await fetch(API_URL + "/cart", {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  })

  const jsonResponse = await apiResponse.json();
  if (apiResponse.ok) {
    return jsonResponse;
  }

  throw new Error(jsonResponse.message)

}

type GetTariffBody = {
  customer_data: CustomerData,
  products: ApiProduct[]

}

export type CustomerData = {
  name: string,
  shipping_street: string,
  commune: string,
  phone: string
}

type ApiProduct = {
  productId: string,
  price: number,
  quantity: number,
  discount: number
}