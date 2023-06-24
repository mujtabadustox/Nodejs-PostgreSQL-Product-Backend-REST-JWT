const customerModel = require("../models/customerModel.js");

const getToken = async (req, res) => {
  try {
    const customers = await customerModel.login(req, res);
    res.status(200).send(customers);
  } catch (err) {
    res.status(401);
  }
};

const getCustomers = async (req, res) => {
  try {
    const header = req.headers["authorization"];
    const token = header && header.split(" ")[1];
    const decoded = req.user;
    const customers = await customerModel.listAllCustomers(token);
    res.status(200).send(customers);
  } catch (err) {
    res.status(401);
  }
};

module.exports = {
  getCustomers,
  getToken,
};
