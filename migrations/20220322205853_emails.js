/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('emails', function (table) {
      table.uuid('uuid').notNullable();
      table.text('email').notNullable();
      table.text('message').notNullable();
      table.timestamp('created_at', { useTz: true });
    })
    .table('emails', function (table) {
      table.primary('uuid');
      table.primary('email');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTable('emails')
};
