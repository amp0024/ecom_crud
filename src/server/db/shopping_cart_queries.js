var knex = require('./knex');

function ShoppingCart() {
  return knex('shopping_cart');
}

function CartProduct() {
  return knex('cart_products');
}


module.exports = {
  createCart: function(user_id){
    return ShoppingCart().insert({user_id: user_id, is_active: true, created_date: knex.fn.now()}, 'id');
  },
  addToCart: function(product){
    return CartProduct().insert({'product_id': product.product_id, 'cart_id': product.cart_id});
  },
  getCartProducts: function(cart_id){
    return CartProduct().innerJoin('shopping_cart', 'shopping_cart.id', 'cart_products.cart_id').where({
                      'cart_products.cart_id': cart_id,
                      'shopping_cart.is_active': true
                      });
  },
  getCheckout: function(cart_id){
    return knex('cart_products')
            .innerJoin('products', 'products.id', 'cart_products.product_id')
            .innerJoin('shopping_cart', 'shopping_cart.id', 'cart_products.cart_id')
            .where({'cart_products.cart_id': cart_id, 'shopping_cart.is_active': true})
            .select('products.name', 'products.img_url', 'products.price', 'products.type', 'products.volume', 'products.mfc_id', 'products.id' )
            .groupBy('products.id')
            .count('products.id');
  },
  deactivateCart: function(cart_id){
    return ShoppingCart().where({'id': cart_id})
                         .update({
                          'is_active': false,
                          'order_submitted': true
                         });
  }
};
