var seeder = require('knex-csv-seeder').seeder.seed;

exports.seed = seeder({
  table: 'products',
  file: './data/products.csv'
});
