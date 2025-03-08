import { NextFunction, Request, Response } from "express";
import { isCustomerData, isProduct } from "../utils/typeUtils/typeCheck";


export const validateCartPost = (request: Request, response: Response, next: NextFunction) => {
  const cart = request.body;

  if (!cart.products) {
    response.status(400).send({ message: "Missing products field" });
    return;
  }

  if (!cart.customer_data) {
    response.status(400).send({ message: "Missing customer_data field" });
    return;
  }

  if (typeof cart.customer_data !== "object") {
    response.status(400).send({ message: "customer_data field must be an object" });
    return;
  }

  if (!Array.isArray(cart.products)) {
    response.status(400).send({ message: "products field must be an array" });
  }

  if (!isCustomerData(cart.customer_data)) {
    response.status(400).send({ message: "customer_data field is incorrect" });
    return;
  }

  for (let product of cart.products) {
    if (!isProduct(product)) {
      response.status(400).send({ message: "Some product field is incorrect" });
      return;
    }
  }


  next();
}
