var knex = require('./knex');

function ShoppingCart() {
  return knex('shopping_cart');
}

function CartProduct() {
  return knex('cart_products');
}

module.exports = {
  createCart: function(session_id){
    console.log(session_id, "Creating cart!!!!");
    return ShoppingCart().insert({session_id: session_id}, 'session_id');
  },
  addToCart: function(product){
    return CartProduct().insert({'product_id': product.product_id, 'cart_id': product.cart_id});
  },
  getCartProducts: function(cart_id){
    console.log(cart_id);
    return CartProduct().where('cart_id', cart_id);
  }
};