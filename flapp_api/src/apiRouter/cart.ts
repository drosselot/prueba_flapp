import { Request, Response, Router } from "express";
import { validateCartPost } from "../middlewares/requestValidation";
import { getAllProducts } from "../db/dbRequests";
import { getFormattedCart } from "../utils/cartUtils/getFormattedCart";
import printCart from "../utils/cartUtils/printCart";
import requestedProductsExist from "../utils/cartUtils/requestedProductsExist";
import getCheapestTariff from "../utils/traifiers/getCheapestTariff";

const cartRouter = Router();

cartRouter.post("/", validateCartPost, async (request: Request, response: Response) => {

  const GET_PRODUCTS_PAGINATION = 10;

  const requestCart = request.body as CartPostBody;
  const allProducts = await getAllProducts(GET_PRODUCTS_PAGINATION);

  if (!requestedProductsExist(requestCart.products, allProducts)) {
    response.status(400).send("Some products in the cart were not found");
    return;
  }

  const formattedCart = getFormattedCart(requestCart, allProducts);
  printCart(formattedCart);


  if (!formattedCart.products.every((product) => product.realStock >= product.quantity)) {
    response.status(400).send("Some products in the cart do not have enough stock");
    return;
  }

  const cheapestTariff = await getCheapestTariff(formattedCart);

  if (cheapestTariff.price) {
    response.status(200).send(cheapestTariff);
  } else {
    response.status(400).send("No tariffs are available");
  }
  return;

})

export default cartRouter;
