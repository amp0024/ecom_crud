var seeder = require('knex-csv-seeder').seeder.seed;

exports.seed = seeder({
  table: 'purchases',
  file: './data/purchase.csv'
});