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
    console.log("Purchase: ", purchase);
    return Purchases().insert({
      'product_id': purchase.id,
      'customer_id': purchase.user_id,
      'purchase_time': new Date(),
      'mfc_id': purchase.mfc_id,
      'quantity': purchase.count,
      'shipName': purchase.ship.shipName,
      'address1': purchase.ship.address1,
      'address2': purchase.ship.address2,
      'city': purchase.ship.city,
      'state': purchase.ship.state,
      'zip': purchase.ship.zip
    });
  },
  getPurchByMfc: function(mfc_id){
    return Purchases().select()
                      .innerJoin('manufacturers', 'manufacturers.id', 'mfc_id')
                      .innerJoin('users', 'users.id', 'customer_id')
                      .where({'mfc_id': mfc_id});
  },
  getPurchByCust: function(user_id){
    return Purchases().select()
                      .innerJoin('products', 'purchases.product_id', 'products.id')
                      .orderBy('purchase_time', 'desc')
                      .where({'customer_id': user_id});
  }
}