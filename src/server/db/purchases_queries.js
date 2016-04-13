var knex = require('./knex');

function Purchases() {
  return knex('purchases');
}

module.exports = {
  getPurchases: function(){
    return Purchases().select();
  },
  getPurchase: function(id){
    return Purchases().where('id', id);
  },
  createPurchase: function(purchase){
    return Purchases().insert({
      'product_id': purchase.product_id,
      'customer_id': purchase.customer_id,
      'purchase_time': new Date(),
      'quantity': purchase.quantity
    });
  }
}