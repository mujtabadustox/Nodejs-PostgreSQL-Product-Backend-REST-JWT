const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController.js");
const auth = require("../middlewares/jwt.js");

router.get("/", auth, orderController.getOrders);
router.get("/:id", auth, orderController.getOrder);
router.post("/", auth, orderController.postOrder);

module.exports = router;
