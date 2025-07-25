import { v2 as cloudinary } from "cloudinary";
import Product from "../models/product.model.js";
//function for add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;
    const image1 = req.files.image1 && req.files?.image1[0];
    const image2 = req.files.image2 && req.files?.image2[0];
    const image3 = req.files.image3 && req.files?.image3[0];
    const image4 = req.files.image4 && req.files?.image4[0];
    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let images_url = await Promise.all(
      images.map(async (item) => {
        let res = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return res.secure_url;
      })
    );

    await Product.create({
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestSeller: bestSeller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: images_url,
      date: Date.now(),
    });

    res.json({ success: 200, message: "Product added successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//function for list product
const listProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ success: true, products ,message:"Product Fetched SuccessFully"});
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//function for removing product
const removeProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//function for single product Info
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product =await Product.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, listProduct, removeProduct, singleProduct };
