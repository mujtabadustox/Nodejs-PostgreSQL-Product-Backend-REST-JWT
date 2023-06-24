const productModel = require("../models/productModel.js");
require("dotenv").config();

const getProducts = async (req, res) => {
  try {
    const header = req.headers["authorization"];
    const token = header && header.split(" ")[1];
    const decoded = req.user;
    const products = await productModel.listAllProducts(token);
    res.status(200).send(products);
  } catch (err) {
    res.status(401);
  }
};

const getProduct = async (req, res) => {
  try {
    const header = req.headers["authorization"];
    const token = header && header.split(" ")[1];
    const decoded = req.user;
    const products = await productModel.listOneProduct(req.params.id, token);
    res.status(200).send(products);
  } catch (err) {
    res.status(401);
  }
};

const updateProducts = async (req, res) => {
  try {
    const header = req.headers["authorization"];
    const token = header && header.split(" ")[1];
    const decoded = req.user;
    const products = await productModel.updateProduct(
      req.params.id,
      req.body,
      token
    );
    res.status(200).send(products);
  } catch (err) {
    res.status(401);
  }
};

module.exports = {
  getProducts,
  getProduct,
  updateProducts,
};
