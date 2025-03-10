'use client'

import { PropsWithChildren, useState } from "react";
import { SetShoppingCartContext, ShoppingCart, ShoppingCartContext } from "./ShoppingCartContext"

const Providers = ({children}: PropsWithChildren) => {

  const [shoppingCart, setShoppingCart] = useState<ShoppingCart | null>(null);

  return (
    <ShoppingCartContext.Provider value={shoppingCart}>
      <SetShoppingCartContext.Provider value={setShoppingCart}>
        {children}
      </SetShoppingCartContext.Provider>
    </ShoppingCartContext.Provider>
  )
}

export default Providers