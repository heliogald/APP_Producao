import express from "express";

import { getItens, addItens, updateItens, deleteItens } from "../controllers/item.js"; 

const router = express.Router();

router.get("/", getItens);

router.post("/", addItens);

router.put("/:id", updateItens);

router.delete("/:id", deleteItens);


export default router;
