import Order from "../models/order.model.js";
import User from "../models/user.model.js";




//placing order using COD method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    await Order.create({
      userId,
      address,
      items,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    });

    await User.findByIdAndUpdate(userId, { cartData: {} });
    res.json({
      success: true,
      message: "Order placed",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//placing order using Stripe method
const placeOrderStripe = async (req, res) => {
 
};

//placing order using Razorpay method
const placeOrderRazorpay = async (req, res) => {
 
};

// All orders data for Admin Panel
const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json({ success: true, orders, message: "Fetching all Orders" });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// User orders data for Frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await Order.find({ userId });

    res.json({ success: true, orders, message: "Fetched" });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Update order status by Admin
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await Order.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateOrderStatus,
};
