import Product from "../models/products.models.js";
import cloudinary from "../bucket/cloudinaryConfig.js";
import multer from "multer";
// Setup multer for handling file uploads
const storage = multer.diskStorage({});
const upload = multer({ storage });


export const createProducts = async (req, res) => {
  // Check if the user is authenticated
  if (!req.user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  // Use multer to handle the image upload
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "File upload error" });
    }

    const { title, description, price } = req.body;

    // Validate input fields
    if (!title || !description || !price) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }

    try {
      // Upload image to Cloudinary
      const cloudinaryResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
      });

      // Create a new product with the image URL and user ID
      const newProduct = new Product({
        title,
        description,
        price,
        image: cloudinaryResult.secure_url, // Store the Cloudinary URL in your product model
        userId: req.user._id, // Use the logged-in user's ID
      });

      // Save the product to the database
      const data = await newProduct.save();

      return res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: data,
      });
    } catch (error) {
      console.log("Error while creating product:", error.message);
      return res.status(500).json({
        success: false,
        message: "Failed to create product",
        error: error.message,
      });
    }
  });
};


export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({createdAt : -1});
    if (products) {
      res.status(201).json({
        success: true,
        message: "Products Fetched successfully",
        data: products,
        length: products.length,
      });
    }
  } catch (error) {
    res
      .status(404)
      .json({ success: false, message: "Failed to get all products" });
    console.log("Error", error.message);
  }
};

export const updateProducts = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  try {
    const products = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    if (products) {
      res
        .status(200)
        .json({ success: true, message: "Product updated", products });
    }
  } catch (error) {
    res
      .status(404)
      .json({ success: false, message: "Failed to update products" });
    console.log("Error", error.message);
  }
};

export const deleteProducts = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  try {
    const products = await Product.findByIdAndDelete(id, product);
    if (products) {
      res
        .status(200)
        .json({ success: true, message: "Product deleted successfully" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to delete product" });
  }
};

export const getProductsById = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  try {
    const products = await Product.findById(id);
    if (!product) {
      // If the product is not found, send a 404 response
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      sucess: true,
      message: "Fetched detailed products",
      data: products,
    });
  } catch (error) {
    res.status(500).json({ sucess: false, message: "Something went wrong!" });
  }
};
