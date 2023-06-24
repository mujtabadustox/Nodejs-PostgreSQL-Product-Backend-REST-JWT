const knex = require("../db/knex.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//order models
/*

order_id
customer_id
grand_total
createdAt

*/

//body
/*
{
    order_id 
    customer_id
    product [
        {
            id,
            quantity,
        }
    ]
}
*/

const AddOrder = async (body, token) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const content = body.products;

    const OrderData = await knex.raw(`SELECT * FROM "order";`);

    let sum = 0;
    let id = 0;

    for (let i = 0; i < content.length; i++) {
      const data = await knex.raw(`SELECT "quantity" , "price" FROM "product"
    WHERE "product_id" = ${content[i].product_id};`);

      let qty = content[i].quantity;
      let newQty = data.rows[0].quantity - qty;

      if (i === 0) {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, "0");
        const day = now.getDate().toString().padStart(2, "0");
        const hours = now.getHours().toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");
        const seconds = now.getSeconds().toString().padStart(2, "0");
        const milliseconds = now.getMilliseconds().toString().padStart(6, "0");

        const timestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;

        let newObj = {
          order_id: OrderData.rows.length + 1,
          customer_id: body.customer_id,
          grand_total: 0,
          created_at: timestamp,
        };

        let ordersNew = await knex.raw(
          `INSERT INTO "order" VALUES(${newObj.order_id}, ${newObj.customer_id}, ${newObj.grand_total}, '${newObj.created_at}');`
        );
      }

      if (newQty >= 0) {
        const updateData = await knex.raw(
          `UPDATE "product"
              SET "quantity" = ${newQty}
              WHERE "product_id" = ${content[i].product_id};
              `
        );

        let price = data.rows[0].price;

        let newPrice = qty * price;

        sum += newPrice;

        let orderLen = await knex.raw(`SELECT * FROM "order_item";`);

        id = orderLen.rows.length + 1;

        const orderId = OrderData.rows.length + 1;

        let orderItem = await knex.raw(
          `INSERT INTO "order_item" VALUES(${id}, ${orderId}, ${content[i].product_id}, ${content[i].quantity}, ${price}, ${newPrice});`
        );
      }
    }

    let lk = await knex.raw(
      `UPDATE "order"
      SET "grand_total" = ${sum}
      WHERE "order_id" = ${OrderData.rows.length + 1};`
    );
  } catch (err) {
    throw new Error("Invalid");
  }
};

const listAllOrders = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const data = await knex.raw(`SELECT * FROM "order";`);
    const orders = data.rows;

    for (let i = 0; i < orders.length; i++) {
      let orderItem = await knex.raw(
        `SELECT order_item_id, product_id, quantity, base_price, total_price FROM "order_item" WHERE order_id = ${orders[i].order_id};`
      );

      orders[i].order_items = orderItem.rows;
    }

    return orders;
  } catch (err) {
    throw new Error("Invalid");
  }
};

const listOneOrder = async (id, token) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const data = await knex.raw(`SELECT * FROM "order" 
  WHERE "order_id" = ${id};`);
    const orders = data.rows;

    let orderItem = await knex.raw(
      `SELECT order_item_id, product_id, quantity, base_price, total_price FROM "order_item" WHERE "order_id" = ${orders[0].order_id};`
    );

    orders[0].order_items = orderItem.rows;

    return orders;
  } catch (err) {
    throw new Error("Invalid");
  }
};

module.exports = {
  listAllOrders,
  listOneOrder,
  AddOrder,
};
