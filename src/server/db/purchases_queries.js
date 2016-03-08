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
  }
}