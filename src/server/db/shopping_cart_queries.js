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
  },
  getCheckout: function(cart_id){
    return knex('cart_products')
            .innerJoin('products', 'products.id', 'cart_products.product_id')
            .where({'cart_products.cart_id': cart_id})
            .select('products.name', 'products.img_url', 'products.price', 'products.type', 'products.volume')
            .groupBy('products.id')
            .count('products.id');
  }
};
