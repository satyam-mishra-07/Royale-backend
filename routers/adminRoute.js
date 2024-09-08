const express = require("express");
const {
  getAllUsers,
  getAllContacts,
  deleteUser,
  getUser,
  deleteIssue,
  getAllOrder,
  getOrder,
  updateOrder
} = require("../controllers/admin-controller");
const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");
// const deleteMiddleware = require('../middlewares/delete-middleware');
const router = express.Router();

router.route("/users").get(authMiddleware, adminMiddleware, getAllUsers);

router
  .route("/users/delete/:id")
  .delete(authMiddleware, adminMiddleware, deleteUser);

router
  .route("/issues/delete/:id")
  .delete(authMiddleware, adminMiddleware, deleteIssue);

router.route("/users/:id").get(authMiddleware, adminMiddleware, getUser);

router
  .route("/users/edit/:id")
  .patch(authMiddleware, adminMiddleware, updateUserByID);

router.route("/issues").get(authMiddleware, adminMiddleware, getAllContacts);

router.route("/orders").get(authMiddleware, adminMiddleware, getAllOrder);

router
  .route("/orders/:orderId")
  .get(authMiddleware, adminMiddleware, getOrder);

router
  .route("/orders/edit/:orderId")
  .patch(authMiddleware, adminMiddleware, updateOrder);


module.exports = router;
