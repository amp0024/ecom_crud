
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cart_products', function(table){
    table.integer('product_id').references('products.id').onDelete('CASCADE');
    table.text('cart_id');
  });
};

exports.down = function(knex, Promise) {
   return knex.schema.dropTable('cart_products');
};

