import express from "express";
import authUser from "../middlewares/user.auth.middleware.js";
import {
  addToCart,
  updateCart,
  getUserCart,
} from "../controllers/cart.controller.js";

const cartRouter = express.Router();

cartRouter.post('/get',authUser ,getUserCart);
cartRouter.post("/add", authUser, addToCart);
cartRouter.post("/update", authUser,updateCart);

export default cartRouter