import { Product, ShoppingCart } from "@/contexts/ShoppingCartContext"
import Image from "next/image";


const ShoppingCartProducts = (props: {shoppingCart: ShoppingCart}) => {
  const {shoppingCart} = props;

  return (
    <div className="w-1/2 flex flex-col mt-15 rounded-md p-5 shadow-lg border border-neutral-200">
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

  const total = product.total.toFixed(2);

  return (
    <div className="flex my-2 bg-neutral-50 shadow-sm rounded-lg border border-neutral-200 p-2" key={product.id}>
      <div className="w-2/10 h-32 relative">
        <Image className="ml-2 rounded-sm p-1 w-1/2 object-contain" fill alt={product.title + " image"} src={product.thumbnail}/>
      </div>
      <div className="ml-3 w-3/10 content-start">
        <p>{product.title}</p>
        <p className="text-zinc-600 text-sm opacity-75">Quantity: {product.quantity}</p>
      </div>
      <div className="flex flex-col justify-between w-5/10">
        <p>{product.price} {product.discountPercentage} {product.discountedTotal}</p>
        <p className="text-end">Total: ${total}</p>
      </div>
    </div>
  )
}