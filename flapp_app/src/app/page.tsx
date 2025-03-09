import { SetShoppingCartContext, ShoppingCartContext } from "@/contexts/ShoppingCartContext";
import { useContext } from "react";


export default function Home() {

  const shoppingCart = useContext(ShoppingCartContext);
  const setShoppingCart = useContext(SetShoppingCartContext);

  return (
    <div>
      <header>
        
      </header>
    </div>
  );
}
