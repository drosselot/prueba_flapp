
const ORIGIN_DATA = {
  name: "Tienda Flapp",
  phone: "+56912345678",
  address: "Juan de Valiente 3630",
  commune: "Vitacura"
}

export const getTraeloYaTariff = async (cart: Cart, printResponse: boolean) => {
  const items: TraeloYaItems[] = [];
  cart.products.forEach((product) => {
    const volume = product.dimensions.width * product.dimensions.height * product.dimensions.depth;
    items.push({
      quantity: product.quantity,
      value: product.price,
      volume: volume,
    })
  })

  const input: TraeloYaTariffInput = {
    items,
    waypoints: [
      {
        type: "PICK_UP",
        addressStreet: ORIGIN_DATA.address,
        city: ORIGIN_DATA.commune,
        phone: ORIGIN_DATA.phone,
        name: ORIGIN_DATA.name,
      },
      {
        type: "DROP_OFF",
        addressStreet: cart.shipping_street,
        city: cart.commune,
        phone: cart.phone,
        name: cart.name,
      }
    ]
  }

  const response = await fetch("https://recruitment.weflapp.com/tarifier/traelo_ya", {
    method: "POST",
    headers: {
      "X-Api-Key": process.env.TRAELO_YA_API_KEY || ""
    },
    body: JSON.stringify(input)
  })

  const jsonResponse = await response.json();
  if (printResponse) {
    console.log(jsonResponse);
  }

  if (!jsonResponse.error) {
    const successfulResponse = jsonResponse as SuccessfulTraeloYaResponse;
    return successfulResponse.deliveryOffers.pricing.total;
  }

  return null;
}

type TraeloYaTariffInput = {
  items: TraeloYaItems[],
  waypoints: [
    {
      type: "PICK_UP",
      addressStreet: string,
      city: string,
      phone: string,
      name: string,
    },
    {
      type: "DROP_OFF",
      addressStreet: string,
      city: string,
      phone: string,
      name: string,
    }
  ],
}

type TraeloYaItems = {
  quantity: number,
  value: number,
  volume: number,
}

type SuccessfulTraeloYaResponse = {
  estimateId: string,
  deliveryOffers: {
    deliveryOfferId: string,
    confirmationTimeLimit: Date,
    deliveryMode: string,
    pricing: {
      total: number
    }
  },
  route: {
    distance: number
  },
  waypoints: [
    {
      type: "PICK_UP",
      latitude: number,
      longitude: number
    },
    {
      type: "DROP_OFF",
      latitude: number,
      longitude: number
    }
  ]
}

export const getUderTariff = async (cart: Cart, printResponse: boolean) => {
  const items: UderItem[] = [];
  cart.products.forEach((product) => {

    items.push({
      name: product.title,
      quantity: product.quantity,
      price: product.price,
      dimensions: {
        length: product.dimensions.width,
        height: product.dimensions.height,
        depth: product.dimensions.depth
      },
    })

  })

  const input: UderTariffInput = {
    pickup_address: ORIGIN_DATA.address,
    pickup_name: ORIGIN_DATA.name,
    pickup_phone_number: ORIGIN_DATA.phone,
    dropoff_address: cart.shipping_street,
    dropoff_name: cart.name,
    dropoff_phone_number: cart.phone,
    manifest_items: items
  }

  const response = await fetch("https://recruitment.weflapp.com/tarifier/uder", {
    method: "POST",
    headers: {
      "X-Api-Key": process.env.UDER_API_KEY || ""
    },
    body: JSON.stringify(input)
  })


  const jsonResponse = await response.json();
  if (printResponse) {
    console.log(jsonResponse);
  }

  if (!jsonResponse.error) {
    const successfulResponse = jsonResponse as SuccessfulUderResponse;
    return successfulResponse.fee;
  }

  return null;
}

type UderTariffInput = {
  pickup_address: string,
  pickup_name: string,
  pickup_phone_number: string,
  dropoff_address: string,
  dropoff_name: string,
  dropoff_phone_number: string,
  manifest_items: UderItem[]
}

type UderItem = {
  name: string,
  quantity: number,
  price: number,
  dimensions: { length: number, height: number, depth: number }
}

type SuccessfulUderResponse = {
  dropoff_eta: string,
  tracking_url: string,
  id: string,
  fee: number,
  dropoff: {
    location: {
    lat: number,
    lng: number
    },
    verification_requirements: {
      signature: boolean,
      picture: boolean,
      pincode: { value: string, enabled: boolean },
      signature_requirement: {
        enabled: boolean,
        collect_signer_name: boolean,
        collect_signer_relationship: boolean
      }
    }
  }
}