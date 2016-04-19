
exports.up = function(knex, Promise) {
  return knex.schema.createTable('customers', function(table){
    table.increments();
    table.integer('user_id');
    table.string('name');
    table.string('address1');
    table.string('address2');
    table.string('state');
    table.string('city');
    table.string('zip');
    table.string('stripe_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('customers');
};
