
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),

    // Inserts seed entries
    knex('users').insert({username: 'adminguy', password: '$2a$10$RisgWhM9VUDKu4uThsPqfeaI6yQM4imVQhE/vhN/zwsm3yhrDjKRi', is_admin: true}),
    knex('users').insert({username: 'guy', password: '$2a$10$RisgWhM9VUDKu4uThsPqfeaI6yQM4imVQhE/vhN/zwsm3yhrDjKRi', is_admin: false, site_id: '1a'})
  );
};
