
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Inserts seed entries
    knex('shopping_cart').insert({ customer_id: 1 }),
    knex('cart_products').insert({ product_id: 1, cart_id: 1, quantity: 1})


  );
};
