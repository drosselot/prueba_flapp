import { Router } from "express";
import cartRouter from "./cart";

const apiRouter = Router();

apiRouter.use("/cart", cartRouter);

export default apiRouter;