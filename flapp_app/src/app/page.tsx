'use client'
import { SetShoppingCartContext, ShoppingCart, ShoppingCartContext } from "@/contexts/ShoppingCartContext";
import Image from "next/image";
import { useContext } from "react";
import LogoAzul from "../../public/LogoAzul.png"
import getRandomNaturalNumber from "@/utils/getRandomNumber";
import ShoppingCartProducts from "@/components/ShoppingCartProducts";

const NUMBER_OF_CARTS = 50

export default function Home() {

  const shoppingCart = useContext(ShoppingCartContext);
  const setShoppingCart = useContext(SetShoppingCartContext);

  const getRandomCart = async () => {
    const shoppingCartId = getRandomNaturalNumber(NUMBER_OF_CARTS);

    const shoppingCartResponse = await fetch('https://dummyjson.com/carts/' + shoppingCartId)
    const jsonShoppingCart = (await shoppingCartResponse.json()) as ShoppingCart;

    setShoppingCart(jsonShoppingCart);
  }

  return (
    <div className="flex flex-col items-center">
      <header className="w-full flex justify-center">
        <Image className="mt-15" width={500} height={500} alt={"flapp logo"} src={LogoAzul}/>
      </header>

      {
        shoppingCart && <ShoppingCartProducts shoppingCart={shoppingCart} />
      }

      <div className="w-full flex justify-center pb-50">
        <div className="w-1/2 flex justify-around mt-20">
          <CustomButton secondary={false} onClick={getRandomCart} text="Crear Carrito" disabled={shoppingCart != null}/>
          <CustomButton secondary onClick={() => setShoppingCart(null)} text="Finalizar Compra" disabled={!shoppingCart}/>
        </div>
      </div>
    </div>
  );
}


const CustomButton = ({secondary, onClick, text, disabled}: CustomButtonProps) => {
  return (
    <button onClick={disabled ? (()=>{}):(onClick)} className={"p-2 px-5 rounded-full shadow-md " + (secondary ? "bg-flapp-blue text-white shadow-flapp-blue/20" : "text-flapp-blue border shadow-slate-200") + (disabled ? " opacity-50" : " hover:shadow-xl")}>
      <p>{text}</p>
    </button>
  )
}

type CustomButtonProps = {
  secondary: boolean,
  onClick: ()=>void,
  text: string,
  disabled: boolean
}