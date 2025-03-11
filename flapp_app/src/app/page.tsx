'use client'
import { SetShoppingCartContext, ShoppingCartContext } from "@/contexts/ShoppingCartContext";
import Image from "next/image";
import { useContext } from "react";
import LogoAzul from "../../public/LogoAzul.png"
import getRandomNaturalNumber from "@/utils/getRandomNumber";
import ShoppingCartProducts from "@/components/ShoppingCartProducts";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/CustomButton";
import { getShoppingCart } from "@/apis/dummyJsonApi";

const NUMBER_OF_CARTS = 50

export default function Home() {

  const shoppingCart = useContext(ShoppingCartContext);
  const setShoppingCart = useContext(SetShoppingCartContext);

  const router = useRouter();

  const getRandomCart = async () => {
    const shoppingCartId = getRandomNaturalNumber(NUMBER_OF_CARTS);
    const shoppingCart = await getShoppingCart(shoppingCartId);

    setShoppingCart(shoppingCart);
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