const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController.js");

router.get("/", productController.getProducts);
router.get("/:id", productController.getProduct);
router.put("/:id", productController.updateProducts);

module.exports = router;
