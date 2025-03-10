'use client'
import CustomButton from "@/components/CustomButton";
import ShoppingCartProducts from "@/components/ShoppingCartProducts";
import { SetShoppingCartContext, ShoppingCartContext } from "@/contexts/ShoppingCartContext";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useState } from "react";


export default function Checkout() {

  const router = useRouter();

  const setShoppingCart = useContext(SetShoppingCartContext);
  const shoppingCart = useContext(ShoppingCartContext);

  const [formMessage, setFormMessage] = useState("");

  const handleGetTariffs = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const jsonFormData = Object.fromEntries(formData.entries());

    if (!jsonFormData.name || !jsonFormData.shipping_street || !jsonFormData.commune || !jsonFormData.phone) {
      setFormMessage("Falta rellenar algún campo.")
    } else {
      setFormMessage("Cotizando...")
      const apiResponse = await fetch(process.env.NEXT_PUBLIC_API_URL + "/cart" || "", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          customer_data: jsonFormData,
          products: shoppingCart?.products || []
        })
      })

      console.log(await apiResponse.json());
    }

  }

  const handleCleanCart = () => {
    router.push("/");
    setShoppingCart(null);
  }

  return (
    <div className="flex flex-col mb-30 items-center">
      <div className="w-1/2 flex mt-10 justify-around">
        <CustomButton text="Limpiar Carrito" onClick={handleCleanCart} secondary />
        <CustomButton text="Volver" onClick={() => router.push("/")} />
      </div>
      <div className="flex flex-row justify-around mx-10">
        <div className="w-1/2">
          <ShoppingCartProducts/>
        </div>
        <div className="w-1/2 p-10">
          <form className="flex flex-row flex-wrap rounded-lg shadow-lg shadow-flapp-blue/30 bg-flapp-blue text-white p-5 justify-center" method="post" onSubmit={handleGetTariffs}>
            <h1 className="text-2xl w-full">Información de envío</h1>
            <CustomInput placeholder="Nombre" inputName="name" divClassName="w-full"/>
            <CustomInput placeholder="Dirección" inputName="shipping_street" divClassName="w-full"/>
            <div className="w-full flex">
              <CustomInput placeholder="Comuna" inputName="commune"/>
              <CustomInput placeholder="Teléfono" inputName="phone"/>
            </div>
            <div className="mt-5 flex flex-col justify-center w-full">
              <p className="text-white h-10 text-center">{formMessage}</p>
                <CustomButton text="Cotizar Despacho" type="submit"/>
            </div>

          </form>
        </div>
      </div>

    </div>
  )
}

const CustomInput = (props: {placeholder: string, inputName: string, divClassName?: string, inputClassName?: string}) => {
  const {placeholder: labelText, inputName, divClassName, inputClassName} = props

  return (
    <div className={"text-lg flex m-2 w-full " + divClassName}>
        <input
          placeholder={"* " + labelText}
          className={"border p-1 pl-3 w-full text-sm placeholder:opacity-80 placeholder:text-white placeholder:text-xs " + inputClassName}
          name={inputName}
        />
    </div>
  )

}