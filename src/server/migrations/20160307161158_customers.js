
exports.up = function(knex, Promise) {
  return knex.schema.createTable('customers', function(table){
    table.increments();
    table.string('name');
    table.string('billing_info');
    table.string('email');
    table.string('password');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('customers');
};
