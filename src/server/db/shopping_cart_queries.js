var knex = require('./knex');

function ShoppingCart() {
  return knex('shopping_cart');
}

function CartProduct() {
  return knex('cart_products');
}

module.exports = {
  getCart: function(id){
    return ShoppingCart().select(id);
  },
  createCart: function(customer_id){
    return ShoppingCart().insert({customer_id: customer_id, is_active: true});
  },
  addToCart: function(id, product){
    return CartProduct().insert({}).where('id', id);
  }
};