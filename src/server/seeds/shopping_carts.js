var seeder = require('knex-csv-seeder').seeder.seed;

exports.seed = seeder({
  table: 'shopping_cart',
  file: './data/carts.csv'
});
