
exports.up = function(knex, Promise) {
  return knex.schema.createTable('products', function(table){
    table.increments();
    table.string('name');
    table.string('type');
    table.decimal('price');
    table.string('volume');
    table.string('img_url');
    table.text('description');
    table.integer('mfc_id');
    table.integer('inventory');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('products');
};
