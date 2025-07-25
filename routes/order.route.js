import express from 'express'
import { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateOrderStatus } from '../controllers/order.controller.js'
import adminAuth from '../middlewares/admin.auth.middleware.js'
import authUser from "../middlewares/user.auth.middleware.js";

const orderRouter = express.Router()
// Admin Features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateOrderStatus);

// Payment Features
orderRouter.post('/place', authUser,placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post('/razorpay', authUser, placeOrderRazorpay);

// User Features
orderRouter.post('/userorders', authUser, userOrders);


export default orderRouter;