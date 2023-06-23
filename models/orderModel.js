const knex = require("../db/knex.js");

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

const AddOrder = async (body) => {
  console.log("abay", body);
  const content = body.products;

  console.log("yar", content);
  let sum = 0;
  for (let i = 0; i < content.length; i++) {
    let qty = content[i].quantity;

    console.log("QUAN", qty);

    const data = await knex.raw(`SELECT "quantity" , "price" FROM "product"
        WHERE "product_id" = ${content[i].product_id};`);

    let price = data.rows[0].price;
    console.log("prod", i, "price", price);
    let newPrice = qty * price;
    console.log("prod", i, "newprice", newPrice);

    sum += newPrice;
    console.log("sum", sum);

    let orderLen = await knex.raw(`SELECT * FROM "order_item";`);

    console.log("aaaaaaa", orderLen);

    let id = orderLen.rows.length + 1;

    console.log("new It id", id);

    const OrderData = await knex.raw(`SELECT * FROM "order";`);

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
      grand_total: sum,
      created_at: timestamp,
    };

    console.log("zzzzzzz", newObj);

    let ordersNew = await knex.raw(
      `INSERT INTO "order" VALUES(${newObj.order_id}, ${newObj.customer_id}, ${newObj.grand_total}, '${newObj.created_at}');`
    );

    let orderItem = await knex.raw(
      `INSERT INTO "order_item" VALUES(${id}, ${newObj.order_id}, ${content[i].product_id}, ${content[i].quantity}, ${price}, ${newPrice});`
    );

    let newQty = data.rows[0].quantity - content[i].quantity;

    const updateData = await knex.raw(
      `UPDATE "product"
              SET "quantity" = ${newQty}
              WHERE "product_id" = ${content[i].product_id};
              `
    );
  }
};

const listAllOrders = async () => {
  const data = await knex.raw(`SELECT * FROM "order";`);
  const orders = data.rows;

  console.log("ddd", orders, typeof orders);

  for (let i = 0; i < orders.length; i++) {
    let orderItem = await knex.raw(
      `SELECT order_item_id, product_id, quantity, base_price, total_price FROM "order_item" WHERE order_id = ${orders[i].order_id};`
    );
    console.log("huh", i, orderItem);
    orders[i].order_items = orderItem.rows;
  }

  console.log("eeee", orders, typeof orders);

  return orders;
};

const listOneOrder = async (id) => {
  const data = await knex.raw(`SELECT * FROM "order" 
  WHERE "order_id" = ${id};`);
  const orders = data.rows;

  console.log("ddd", orders, typeof orders);

  let orderItem = await knex.raw(
    `SELECT order_item_id, product_id, quantity, base_price, total_price FROM "order_item" WHERE "order_id" = ${orders[0].order_id};`
  );
  console.log("huh", orderItem);
  orders[0].order_items = orderItem.rows;

  console.log("eeee", orders, typeof orders);

  return orders;
};

module.exports = {
  listAllOrders,
  listOneOrder,
  AddOrder,
};
