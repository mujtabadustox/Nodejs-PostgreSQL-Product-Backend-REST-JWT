const orderModel = require("../models/orderModel.js");

const postOrder = async (req, res) => {
  const orders = await orderModel.AddOrder(req.body);
  res.status(200).send(orders);
};

const getOrders = async (req, res) => {
  const orders = await orderModel.listAllOrders(req.body);
  res.status(200).send(orders);
};

const getOrder = async (req, res) => {
  const orders = await orderModel.listOneOrder(req.params.id);
  res.status(200).send(orders);
};

module.exports = {
  getOrders,
  getOrder,
  postOrder,
};
