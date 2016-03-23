
exports.up = function(knex, Promise) {
  return knex.schema.createTable('shopping_cart', function(table){
    table.increments();
    table.integer('customer_id').references('customers.id').onDelete('CASCADE');
    table.boolean('is_active');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('shopping_cart');
};
