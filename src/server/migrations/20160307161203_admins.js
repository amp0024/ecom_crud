
exports.up = function(knex, Promise) {
  return knex.schema.createTable('admins', function(table){
    table.increments();
    table.string('name');
    table.string('email');
    table.string('password');
    table.string('access_level');
    table.integer('mfc_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('admins');
};
