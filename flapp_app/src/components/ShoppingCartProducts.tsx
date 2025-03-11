'use client'
import { Product, ShoppingCartContext } from "@/contexts/ShoppingCartContext"
import { formatNumberToChilean } from "@/utils/formatNumber";
import Image from "next/image";
import { useContext } from "react";


const ShoppingCartProducts = (props: {maxHeight?: number}) => {
  const {maxHeight} = props;

  const shoppingCart = useContext(ShoppingCartContext);

  return (
    <div className={"flex flex-col mt-10 rounded-md p-5 shadow-lg border border-neutral-200 " + (maxHeight && (" overflow-y-scroll h-130 "))}>
      {
        shoppingCart?.products.map((product) => (
          <ProductInShoppingCart key={product.id} product={product}/>
        ))
      }
    </div>
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