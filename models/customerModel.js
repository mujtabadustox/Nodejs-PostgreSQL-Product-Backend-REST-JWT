const knex = require('../db/knex.js');

const listAllCustomers = async () => {
    const data = await knex.raw(`SELECT * FROM "customer";`);
    return data.rows;
}

module.exports = {
    listAllCustomers,
}