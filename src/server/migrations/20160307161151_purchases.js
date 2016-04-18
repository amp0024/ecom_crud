
exports.up = function(knex, Promise) {
  return knex.schema.createTable('purchases', function(table){
    table.increments();
    table.integer('product_id');
    table.integer('customer_id');
    table.string('shipName');
    table.string('address1');
    table.string('address2');
    table.string('city');
    table.string('state');
    table.string('zip');
    table.dateTime('purchase_time');
    table.integer('mfc_id');
    table.integer('quantity');
    table.string('order_status');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('purchases');
};
