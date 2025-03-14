'use client'
import { Product, ShoppingCartContext } from "@/contexts/ShoppingCartContext"
import { formatNumberToChilean } from "@/utils/formatNumber";
import Image from "next/image";
import { useContext } from "react";
import { motion } from "motion/react";
import LoadingIndicator from "./LoadingIndicator";


const ShoppingCartProducts = (props: {fixedHeight?: boolean}) => {

  const { fixedHeight } = props;

  const shoppingCart = useContext(ShoppingCartContext);

  const loadingCart = shoppingCart == null;

  return (
    <motion.div initial={{scale: 0}} animate={{scale: 1}} className={"flex flex-col mt-10 rounded-md p-5 shadow-lg border border-neutral-200 " + (fixedHeight && (" h-130 overflow-y-scroll"))}>
      {
        loadingCart ? (
          <div className="flex flex-row">
            <p>Loading cart...</p>
            <LoadingIndicator/>
          </div>
        ) : (
          shoppingCart?.products.map((product) => (
            <ProductInShoppingCart key={product.id} product={product}/>
          ))
        )
      }
    </motion.div>
  )
}

export default ShoppingCartProducts;

const ProductInShoppingCart = (props: {product: Product}) => {
  const {product} = props;

  const total = formatNumberToChilean(product.total);
  const discountedTotal = formatNumberToChilean(product.total);
  const price = formatNumberToChilean(product.price)

  return (
    <div className="flex my-2 shadow-md rounded-lg border-t border-x border-neutral-200 p-2" key={product.id}>
      <div className="w-4/10 h-32 relative">
        <Image className="ml-2 rounded-sm p-1 w-1/2 object-contain" fill alt={product.title + " image"} src={product.thumbnail}/>
      </div>
      <div className="ml-3 w-3/10 content-start">
        <p>{product.title}</p>
        <p className="text-zinc-600 text-sm opacity-75">Quantity: {product.quantity}</p>
        <p className="text-zinc-600 text-sm opacity-75">${price}</p>
      </div>
      <div className="flex flex-col justify-end w-1/2">
        <p className="line-through text-end text-xs opacity-75">${discountedTotal}</p>
        <p className="text-end">Total: <span className="font-bold text-flapp-blue">${total}</span></p>
      </div>
    </div>
  )
}