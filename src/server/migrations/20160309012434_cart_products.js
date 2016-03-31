
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cart_products', function(table){
    table.integer('product_id').references('products.id').onDelete('CASCADE');
    table.integer('cart_id').references('shopping_cart.id').onDelete('CASCADE');
    table.integer('quantity');
  });
};

exports.down = function(knex, Promise) {
   return knex.schema.dropTable('cart_products');
};

