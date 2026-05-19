// import { category } from "../models/category.model.js";

// export const getCategory = async(req,res)=>{
//     try {
//         const categories = await category.find();
//         res.status(200).json({success: true,categories});
//     } catch (error) {
//         res.status(500).json({message: error.message || "Internal Server Error" });
//     }
// }

// export const addCategory =  async(req,res) => {
//     try {
//         const categories = await category.create({name});
//         res.status(201).json({success: true,category});
//     } catch (error) {
//         res.status(500).json({message: error.message || "Internal Server Error"});
//     }
    
// }

// export const deleteCategory = async(req,res)=>{
//     try {
//         const categories = await category.findByIdAndDelete(req.params.id);
//         res.status(200).json({success: true, message:"Category Deleted"});
//     } catch (error) {
//         res.status(500).json({message: error.message || "Internal Server Error"});
//     }
// }
import { Category } from "../models/category.model.js";

// GET ALL CATEGORIES
export const getCategory =
  async (req, res) => {

    try {

      const categories =
        await Category.find().sort({
          createdAt: -1,
        });

      res.status(200).json({

        success: true,

        categories,
      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message ||
          "Internal Server Error",
      });
    }
  };

// ADD CATEGORY
export const addCategory =
  async (req, res) => {

    try {

      // GET NAME
      const { name } =
        req.body;

      // CHECK EMPTY
      if (!name) {

        return res
          .status(400)
          .json({

            success: false,

            message:
              "Category name is required",
          });
      }

      // CHECK EXISTING
      const existingCategory =
        await Category.findOne({

          name,
        });

      if (existingCategory) {

        return res
          .status(400)
          .json({

            success: false,

            message:
              "Category already exists",
          });
      }

      // CREATE CATEGORY
      const newCategory =
        await Category.create({

          name,
        });

      res.status(201).json({

        success: true,

        message:
          "Category Added Successfully",

        category:
          newCategory,
      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message ||
          "Internal Server Error",
      });
    }
  };

// DELETE CATEGORY
export const deleteCategory =
  async (req, res) => {

    try {

      const category =
        await Category.findById(
          req.params.id
        );

      // CHECK CATEGORY
      if (!category) {

        return res
          .status(404)
          .json({

            success: false,

            message:
              "Category Not Found",
          });
      }

      // DELETE
      await category.deleteOne();

      res.status(200).json({

        success: true,

        message:
          "Category Deleted Successfully",
      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message ||
          "Internal Server Error",
      });
    }
  };