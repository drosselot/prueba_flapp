import express from "express";
import apiRouter from "./apiRouter";
import cors from "cors";

const app = express()

app.use(cors());

app.use(express.json());

app.use("/api", apiRouter);

const port = 3001;
app.listen(port, () => {
  console.log(`Flapp api listening on port ${port}`)
})