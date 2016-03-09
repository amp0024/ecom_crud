var knex = require('./knex');

function Manufacturers() {
  return knex('manufacturers');
}

module.exports = {
  getManufacturers: function(){
    return Manufacturers().select();
  },
  getManufacturer: function(id){
    return Manufacturers().where('id', id);
  },
  createManufacturer: function(manufacturer){
    return Manufacturers().insert(manufacturer, 'id');
  },
  editManufacturer: function(manufacturer, id){
    return Manufacturers().where('id', id).update(manufacturer);
  },
  deleteManufacturer: function(id){
    console.log('id');
    return Manufacturers().where('id', id).delete();
  }
}