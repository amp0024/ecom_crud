var knex = require('./knex');

function Products() {
  return knex('products');
}

module.exports = {
  getProducts: function(){
    return Products().select().join('manufacturers', 'mfc_id', 'manufacturers.id');
  },
  getProduct: function(id){
    return Products().where('id', id);
  },
  createProduct: function(product){
    return Products().insert(product, 'id');
  },
  editProduct: function(product, id){
    return Products().where('id', id).update(product);
  },
  deleteProduct: function(id){
    console.log('id');
    return Products().where('id', id).delete();
  }
}