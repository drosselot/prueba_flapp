'use client'
import { SetShoppingCartContext, ShoppingCart, ShoppingCartContext } from "@/contexts/ShoppingCartContext";
import Image from "next/image";
import { useContext } from "react";
import LogoAzul from "../../public/LogoAzul.png"
import getRandomNaturalNumber from "@/utils/getRandomNumber";
import ShoppingCartProducts from "@/components/ShoppingCartProducts";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/CustomButton";

const NUMBER_OF_CARTS = 50

export default function Home() {

  const shoppingCart = useContext(ShoppingCartContext);
  const setShoppingCart = useContext(SetShoppingCartContext);

  const router = useRouter();

  const getRandomCart = async () => {
    const shoppingCartId = getRandomNaturalNumber(NUMBER_OF_CARTS);

    const shoppingCartResponse = await fetch('https://dummyjson.com/carts/' + shoppingCartId)
    const jsonShoppingCart = (await shoppingCartResponse.json()) as ShoppingCart;

    setShoppingCart(jsonShoppingCart);
  }

  return (
    <div className="flex flex-col items-center">
      <header className="mt-10 w-full flex justify-center relative h-28 ">
        <Image className="object-contain" fill alt={"flapp logo"} src={LogoAzul}/>
      </header>

      <div className="w-1/3">
        {
          shoppingCart && <ShoppingCartProducts maxHeight={130} />
        }
      </div>

      <div className="w-full flex justify-center pb-50">
        <div className="w-1/2 flex justify-around mt-10">
          <CustomButton secondary={false} onClick={getRandomCart} text="Crear Carrito" disabled={shoppingCart != null}/>
          <CustomButton secondary onClick={() => { router.push('/checkout') }} text="Finalizar Compra" disabled={!shoppingCart}/>
        </div>
      </div>
    </div>
  );
}