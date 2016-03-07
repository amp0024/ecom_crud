
exports.up = function(knex, Promise) {
  return knex.schema.createTable('manufacturers', function(table){
    table.increments();
    table.string('name');
    table.string('location');
    table.string('contact');
    table.string('logo_url');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('manufacturers');
};
