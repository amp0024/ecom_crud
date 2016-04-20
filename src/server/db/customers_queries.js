var knex = require('./knex');

function Customers() {
  return knex('customers');
}

module.exports = {
  getCustomers: function(){
    return Customers().select();
  },
  getCustomer: function(id){
    return Customers().where('user_id', id);
  },
  createCustomer: function(customer){
    return Customers().insert(customer).catch(function(err){
      console.log(err);
    });
  }
}