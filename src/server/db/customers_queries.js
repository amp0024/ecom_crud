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
  },
  createCustomer: function(customer){
    console.log("Query Customer ", customer);
    return Customers().insert(customer, 'id');
  }
}