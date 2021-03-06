
exports.up = function(knex, Promise) {
  return knex.schema.createTable('manufacturers', function(table){
    table.increments();
    table.string('mfc_name');
    table.string('location');
    table.string('contact');
    table.string('logo_url');
    table.string('background_header');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('manufacturers');
};
