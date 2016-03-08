
exports.up = function(knex, Promise) {
  knex.schema.table('products', function(table){
    table.dropColumn('volume');
    table.string('volume');
  })
};

exports.down = function(knex, Promise) {
  knex.schema.table('products', function(table){
    table.dropColumn('volume');
    table.integer('volume');
  })
};
