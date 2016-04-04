
exports.up = function(knex, Promise) {
  return knex.schema.createTable('shopping_cart', function(table){
    table.increments();
    table.text('session_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('shopping_cart');
};
