'use client'
import { CustomerData, getTariff } from "@/apis/backendApi";
import CustomButton from "@/components/CustomButton";
import ShoppingCartProducts from "@/components/ShoppingCartProducts";
import { SetShoppingCartContext, ShoppingCartContext } from "@/contexts/ShoppingCartContext";
import formatProductsForBackend from "@/utils/formatProductsForBackend";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useState } from "react";
import { formatNumberToChilean } from "@/utils/formatNumber";
import LoadingIndicator from "@/components/LoadingIndicator";

const LOADING_TARIFFS_MESSAGE = "Cotizando envío"

export default function Checkout() {

  const router = useRouter();

  const setShoppingCart = useContext(SetShoppingCartContext);
  const shoppingCart = useContext(ShoppingCartContext);

  const [formMessage, setFormMessage] = useState("");


  const handleGetTariffs = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!shoppingCart || shoppingCart.products.length == 0) {
      setFormMessage("Es necesario agregar productos al carrito");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const jsonFormData = Object.fromEntries(formData.entries()) as CustomerData;
    if (!jsonFormData.name || !jsonFormData.shipping_street || !jsonFormData.commune || !jsonFormData.phone) {
      setFormMessage("Falta rellenar algún campo.")
      return;
    }

    setFormMessage(LOADING_TARIFFS_MESSAGE)
    try {
      const getTariffResponse = await getTariff({
        customer_data: jsonFormData,
        products: formatProductsForBackend(shoppingCart.products)
      })
      setFormMessage(`${getTariffResponse.courier} ⚡️ - $ ${formatNumberToChilean(getTariffResponse.price)}`)
    } catch (error) {
      if (error instanceof Error)
      console.log(error.message);
      setFormMessage("No hay envíos disponibles :(")
    }
  }

  const handleCleanCart = () => {
    router.push("/");
    setShoppingCart(null);
  }

  return (
    <div className="flex flex-col mb-30 items-center">
      <div className="w-1/2 flex mt-10 justify-around">
        <CustomButton text="Volver" onClick={() => router.push("/")} />
        <CustomButton text="Limpiar Carrito" onClick={handleCleanCart} secondary />
      </div>
      <div className="flex flex-row justify-around mx-10">

        <div className="w-3/5 p-10">
          <GetTariffForm formMessage={formMessage} handleGetTariffs={handleGetTariffs}/>
        </div>

        <div className="w-2/5 ">
          <ShoppingCartProducts/>
        </div>
      </div>

    </div>
  )
}

const GetTariffForm = (props: {formMessage: string, handleGetTariffs: (event: FormEvent<HTMLFormElement>) => void}) => {

  const {formMessage, handleGetTariffs} = props

  return (
    <form className="flex flex-row flex-wrap rounded-lg shadow-lg shadow-flapp-blue/30 bg-flapp-blue text-white p-5 justify-center" method="post" onSubmit={handleGetTariffs}>
      <h1 className="text-2xl w-full">Información de envío</h1>
      <CustomInput placeholder="Nombre" inputName="name" divClassName="w-full"/>
      <CustomInput placeholder="Dirección" inputName="shipping_street" divClassName="w-full"/>
      <div className="w-full flex">
        <CustomInput placeholder="Comuna" inputName="commune"/>
        <CustomInput placeholder="Teléfono" inputName="phone"/>
      </div>
      <div className="mt-5 flex flex-col justify-center w-full">
        <div className="flex flex-row justify-center">
          <p className="text-white h-10 text-center">{formMessage}</p>
          {
            formMessage === LOADING_TARIFFS_MESSAGE && (
              <LoadingIndicator/>
            )
          }
        </div>
        <CustomButton text="Cotizar Despacho" type="submit"/>
      </div>

    </form>
  )
}

const CustomInput = (props: {placeholder: string, inputName: string, divClassName?: string, inputClassName?: string}) => {
  const {placeholder: labelText, inputName, divClassName, inputClassName} = props

  return (
    <div className={"text-lg flex m-2 w-full flex-col " + divClassName}>
        <p className="font-bold text-sm mt-1">{labelText}</p>
        <input
          placeholder={"* " + labelText}
          className={"border p-1 pl-3 w-full text-sm placeholder:opacity-80 placeholder:text-white placeholder:text-xs " + inputClassName}
          name={inputName}
        />
    </div>
  )

}