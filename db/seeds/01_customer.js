/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  return knex.raw(`
		DELETE FROM "customer";
		ALTER SEQUENCE "customer_customer_id_seq" RESTART WITH 1;

		INSERT INTO "customer" ("customer_name","email","password") VALUES
		('Liam James','liam@gmail.com','$2a$10$REl0575B/txDCNm9p2XOvuIFHo1oMx77fDuTDnczKdrwMZmA7i4V2'),
		('Olivia Rose','olivia@gmail.com','$2a$10$SL5mwznQfcB3dSX4E1EUUelT20bCgT.ULsLoMqx937NJsJFvKgPJS'),
		('Emma Grace','emma@gmail.com','$2a$10$w6/NI7kOh9Z4Bw4jBp.3l.z5XXVc.gKS4MOST1RHsixog4BD3FTFe'),
		('Noah William','noah@gmail.com','$2a$10$oMXCQXXLpnkT0AaJtQbVV.hdTKVeL0oAhAwYOr9SX5OgadyK3rw5i'),
		('Ava Elizabeth','ava@gmail.com','$2a$10$DRBs5csOaJzWl1sz8ohqC.iWxWgDYFPuET6vprAsnYJGAKixRENZ.');
	`);
};
