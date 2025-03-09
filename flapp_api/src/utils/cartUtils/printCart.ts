

const printCart = (cart: Cart) => {
  printCustomerData(cart);
  printSeparation();
  printProductsInCart(cart.products);
}

const printCustomerData = (cart: Cart) => {
  console.log(`Cart from ${cart.name}:`)
  console.log(`Address: ${cart.shipping_street}, ${cart.commune}`)
  console.log(`Phone: ${cart.phone}`)
}

const printSeparation = () => {
  console.log("-------------------")
}

const printProductsInCart = (formattedProducts: ProductInCart[]) => {
  formattedProducts.forEach((product) => {
    console.log("---- Product ----")
    console.log(`Id: ${product.id}`)
    console.log(`Name: ${product.title}`)
    console.log(`Unit price: ${product.price}`)

    const totalDiscount = product.price * product.discount;
    console.log(`Total discount: ${totalDiscount}`)

    console.log(`Quantity: ${product.quantity}`)
    console.log(`Stock: ${product.stock}`)
    console.log(`Rating: ${product.rating}`)
    console.log(`Real Stock: ${product.realStock}`)
  })
}


export default printCart;