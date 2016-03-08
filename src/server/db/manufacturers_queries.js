var knex = require('./knex');

function Manufacturers() {
  return knex('Manufacturers');
}

module.exports = {
  getManufacturers: function(){
    return Manufacturers().select();
  },
  getManufacturer: function(id){
    return Manufacturers().where('id', id);
  }
}