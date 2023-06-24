const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController.js");
const auth = require("../middlewares/jwt.js");

router.get("/", auth, productController.getProducts);
router.get("/:id", auth, productController.getProduct);
router.put("/:id", auth, productController.updateProducts);

module.exports = router;
