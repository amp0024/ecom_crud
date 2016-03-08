
exports.up = function(knex, Promise) {
  return knex.schema.createTable('purchases', function(table){
    table.increments();
    table.integer('product_id');
    table.integer('customer_id');
    table.dateTime('purchase_time');
    table.integer('quantity');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('purchases');
};
