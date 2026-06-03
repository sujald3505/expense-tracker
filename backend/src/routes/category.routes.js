import { Router } from "express";

import {
  addCategory,
  deleteCategory,
  getCategory,
} from "../controllers/category.controller.js";

const categoryRoute = Router();

// GET ALL CATEGORY
categoryRoute.get("/", getCategory);

// ADD CATEGORY
categoryRoute.post("/add", addCategory);

// DELETE CATEGORY
categoryRoute.delete("/:id", deleteCategory);

export default categoryRoute;
