/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.raw(`
    ALTER TABLE "customer"
    ADD COLUMN email VARCHAR(255),
    ADD COLUMN password VARCHAR(255)
    
`);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.raw(`
    ALTER TABLE "customer"
    DROP COLUMN email,
    DROP COLUMN password
    
`);
};
