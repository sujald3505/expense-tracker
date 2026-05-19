// import { Router } from "express";
// import { addCategory, deleteCategory, getCategory } from "../controllers/category.controller.js";
// import userRoute from "./user.route.js";


// const categoryRoute =  Router();

// categoryRoute.get("/",getCategory);
// categoryRoute.post("/add",addCategory);
// categoryRoute.delete("/:id",deleteCategory)


// export default categoryRoute;
import { Router } from "express";

import {

  addCategory,

  deleteCategory,

  getCategory,

} from "../controllers/category.controller.js";

const categoryRoute =
  Router();

// GET ALL CATEGORY
categoryRoute.get(
  "/",
  getCategory
);

// ADD CATEGORY
categoryRoute.post(
  "/add",
  addCategory
);

// DELETE CATEGORY
categoryRoute.delete(
  "/:id",
  deleteCategory
);

export default categoryRoute;