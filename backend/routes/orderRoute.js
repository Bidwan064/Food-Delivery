import express from "express";
import Order from "../models/orderModel.js";
import authMiddleware from "../middleware/auth.js";
import { listOrders, placeOrder, updateStatus, userOrders, verifyOrder } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/status",authMiddleware,updateStatus);
orderRouter.post("/userorders",authMiddleware,userOrders);
orderRouter.get("/list",authMiddleware,listOrders);

// Delete all orders (Admin only)
orderRouter.delete("/deleteAll", async (req, res) => {
  try {
    const result = await Order.deleteMany({});
    res.json({ success: true, message: "✅ All orders deleted successfully", deletedCount: result.deletedCount });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
export default orderRouter;
