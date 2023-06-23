const knex = require("../db/knex.js");

const listAllProducts = async () => {
  const data = await knex.raw(`SELECT * FROM "product";`);
  return data.rows;
};

const listOneProduct = async (id) => {
  const data = await knex.raw(
    `SELECT * FROM "product"
    WHERE "product_id" = ${id};`
  );
  return data.rows;
};

const updateProduct = async (id, body) => {
  const data = await knex.raw(
    `UPDATE "product"
      SET "quantity" = ${body.quantity}, "price" = ${body.price}
      WHERE "product_id" = ${id};
      `
  );
  return data.rows;
};

module.exports = {
  listAllProducts,
  listOneProduct,
  updateProduct,
};
