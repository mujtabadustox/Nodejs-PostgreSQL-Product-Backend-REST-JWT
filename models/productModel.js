const knex = require("../db/knex.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const listAllProducts = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const data = await knex.raw(`SELECT * FROM "product";`);
    return data.rows;
  } catch (err) {
    throw new Error("Invalid");
  }
};

const listOneProduct = async (id, token) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const data = await knex.raw(
      `SELECT * FROM "product"
      WHERE "product_id" = ${id};`
    );
    return data.rows;
  } catch (err) {
    throw new Error("Invalid");
  }
};

const updateProduct = async (id, body, token) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const data = await knex.raw(
      `UPDATE "product"
        SET "quantity" = ${body.quantity}, "price" = ${body.price}
        WHERE "product_id" = ${id};
        `
    );
    return data.rows;
  } catch (err) {
    throw new Error("Invalid");
  }
};

module.exports = {
  listAllProducts,
  listOneProduct,
  updateProduct,
};
