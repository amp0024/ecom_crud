
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments();
    table.string('username');
    table.string('password');
    table.boolean('is_admin');
    table.string('site_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
