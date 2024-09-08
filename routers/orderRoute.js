const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order_controller");
const authMiddleware = require("../middleware/auth-middleware");

router.route("/checkout").post(orderController.order);
router.route("/orderHistory").get(authMiddleware, orderController.orderHistory);

module.exports = router;