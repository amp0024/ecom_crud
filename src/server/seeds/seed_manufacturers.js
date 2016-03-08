var seeder = require('knex-csv-seeder').seeder.seed;

exports.seed = seeder({
  table: 'manufacturers',
  file: './data/manufacturers.csv'
});