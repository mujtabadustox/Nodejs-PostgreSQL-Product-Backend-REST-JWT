const productModel = require("../models/productModel.js");

const getProducts = async (req, res) => {
  const products = await productModel.listAllProducts();
  res.status(200).send(products);
};

const getProduct = async (req, res) => {
  const products = await productModel.listOneProduct(req.params.id);
  res.status(200).send(products);
};

const updateProducts = async (req, res) => {
  const products = await productModel.updateProduct(req.params.id, req.body);
  res.status(200).send(products);
};

module.exports = {
  getProducts,
  getProduct,
  updateProducts,
};
