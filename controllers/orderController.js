const orderModel = require("../models/orderModel.js");
require("dotenv").config();

const postOrder = async (req, res) => {
  try {
    const header = req.headers["authorization"];
    const token = header && header.split(" ")[1];
    const decoded = req.user;
    const orders = await orderModel.AddOrder(req.body, token);
    res.status(200).send(orders);
  } catch (err) {
    res.status(401);
  }
};

const getOrders = async (req, res) => {
  try {
    const header = req.headers["authorization"];
    const token = header && header.split(" ")[1];
    const decoded = req.user;
    const orders = await orderModel.listAllOrders(token);
    res.status(200).send(orders);
  } catch (err) {
    res.status(401);
  }
};

const getOrder = async (req, res) => {
  try {
    const header = req.headers["authorization"];
    const token = header && header.split(" ")[1];
    const decoded = req.user;
    const orders = await orderModel.listOneOrder(req.params.id, token);
    res.status(200).send(orders);
  } catch (err) {
    res.status(401);
  }
};

module.exports = {
  getOrders,
  getOrder,
  postOrder,
};
