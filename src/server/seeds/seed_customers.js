var seeder = require('knex-csv-seeder').seeder.seed;

exports.seed = seeder({
  table: 'customers',
  file: './data/customers.csv'
});