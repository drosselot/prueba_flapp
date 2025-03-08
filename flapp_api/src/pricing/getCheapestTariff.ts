import { getTraeloYaTariff, getUderTariff } from "./tariffGetters";

const COURIERS = ["TraeloYa", "Uder"]

const getCheapestTariff = async (cart: Cart, printResponses: boolean = true) => {
  let cheapestTariff: Tariff = {
    courier: null,
    price: null,
  }

  for (let courier of COURIERS) {

    const tariff = await getTariff(courier, cart, printResponses)

    if (tariff) {

      if (!cheapestTariff.price || tariff < cheapestTariff.price) {
        cheapestTariff = {
          courier: courier,
          price: tariff,
        }
      }

    }
  }

  return cheapestTariff;
}

const getTariff = async (courier: string, cart: Cart, printResponses: boolean): Promise<number | null> => {
  switch (courier) {
    case "TraeloYa":
      return await getTraeloYaTariff(cart, printResponses)
    case "Uder":
      return await getUderTariff(cart, printResponses)
    default:
      return null
  }
}

export type Tariff = {
  price: number | null,
  courier: string | null,
}


export default getCheapestTariff;