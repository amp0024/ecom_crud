var knex = require('./knex');

function Customer() {
  return knex('customers');
}

module.exports = {
  getCustomers: function(){
    return Customers().select();
  },
  getCustomer: function(id){
    return Customers().where('id', id);
  }
}