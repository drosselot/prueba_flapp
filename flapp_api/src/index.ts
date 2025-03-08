import express from "express";
import apiRouter from "./apiRouter";
import cors from "cors";

const app = express()

app.use(cors());

app.use(express.json());

app.use("/api", apiRouter);

const port = process.env.PORT || 1414;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})