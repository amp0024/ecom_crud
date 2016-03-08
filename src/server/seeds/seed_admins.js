var seeder = require('knex-csv-seeder').seeder.seed;

exports.seed = seeder({
  table: 'admins',
  file: './data/admins.csv'
});
