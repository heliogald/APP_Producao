import express from "express";
import cors from "cors";

import itemRoute from "./route/itens.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use("/", itemRoute);


app.listen(4000);



