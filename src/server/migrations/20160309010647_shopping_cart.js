
exports.up = function(knex, Promise) {
  return knex.schema.createTable('shopping_cart', function(table){
    table.increments();
    table.integer('user_id');
    table.boolean('is_active');
    table.date('created_date');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('shopping_cart');
};
